"""
Business: Авторизация администраторов портала ЦК КПСС
Args: event - dict с httpMethod, body, headers
      context - object с request_id и другими атрибутами
Returns: HTTP response dict с токеном или ошибкой
"""

import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime, timedelta
import hashlib

def generate_token(username: str) -> str:
    """Генерация простого токена для сессии"""
    timestamp = datetime.now().isoformat()
    raw = f"{username}:{timestamp}:cckpss_secret"
    return hashlib.sha256(raw.encode()).hexdigest()

def verify_password(password: str, stored_hash: str) -> bool:
    """Проверка пароля"""
    return hashlib.sha256(password.encode()).hexdigest() == stored_hash

def hash_password(password: str) -> str:
    """Хеширование пароля"""
    return hashlib.sha256(password.encode()).hexdigest()

def handler(event: dict, context: any):
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    
    try:
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            action = body_data.get('action', 'login')
            
            if action == 'login':
                username = body_data.get('username', '')
                password = body_data.get('password', '')
                
                if not username or not password:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Логин и пароль обязательны'}),
                        'isBase64Encoded': False
                    }
                
                with conn.cursor(cursor_factory=RealDictCursor) as cur:
                    cur.execute("SELECT username, password_hash FROM admins WHERE username = %s", (username,))
                    admin = cur.fetchone()
                    
                    if not admin:
                        return {
                            'statusCode': 401,
                            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                            'body': json.dumps({'error': 'Неверный логин или пароль'}),
                            'isBase64Encoded': False
                        }
                    
                    if not verify_password(password, admin['password_hash']):
                        return {
                            'statusCode': 401,
                            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                            'body': json.dumps({'error': 'Неверный логин или пароль'}),
                            'isBase64Encoded': False
                        }
                    
                    token = generate_token(username)
                    
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({
                            'token': token,
                            'username': username,
                            'message': 'Успешная авторизация'
                        }),
                        'isBase64Encoded': False
                    }
            
            elif action == 'create_admin':
                username = body_data.get('username', '')
                password = body_data.get('password', '')
                
                if not username or not password:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Логин и пароль обязательны'}),
                        'isBase64Encoded': False
                    }
                
                password_hash = hash_password(password)
                
                with conn.cursor() as cur:
                    cur.execute(
                        "INSERT INTO admins (username, password_hash) VALUES (%s, %s) ON CONFLICT (username) DO NOTHING",
                        (username, password_hash)
                    )
                    conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'message': 'Администратор создан'}),
                    'isBase64Encoded': False
                }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Метод не поддерживается'}),
            'isBase64Encoded': False
        }
        
    finally:
        conn.close()
