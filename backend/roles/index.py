"""
Business: Подача заявок на получение ролей от граждан
Args: event - dict с httpMethod, body
      context - object с request_id
Returns: HTTP response dict с результатом операции
"""

import json
import os
import psycopg2
from datetime import date

def handler(event: dict, context: any):
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Метод не поддерживается'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    name = body_data.get('name', '').strip()
    role = body_data.get('role', '').strip()
    reason = body_data.get('reason', '').strip()
    
    if not name or not role or not reason:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Все поля обязательны для заполнения'}),
            'isBase64Encoded': False
        }
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    
    try:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO role_requests (name, role, reason, status) VALUES (%s, %s, %s, 'pending')",
                (name, role, reason)
            )
            conn.commit()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'message': 'Заявка успешно отправлена'}),
            'isBase64Encoded': False
        }
        
    finally:
        conn.close()
