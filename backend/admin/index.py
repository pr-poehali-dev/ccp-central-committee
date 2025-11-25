"""
Business: API для управления контентом портала администраторами
Args: event - dict с httpMethod, body, headers, queryStringParameters
      context - object с request_id
Returns: HTTP response dict с данными или результатом операции
"""

import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import date

def handler(event: dict, context: any):
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    
    try:
        params = event.get('queryStringParameters', {}) or {}
        entity = params.get('entity', '')
        
        if method == 'GET':
            if entity == 'settings':
                with conn.cursor(cursor_factory=RealDictCursor) as cur:
                    cur.execute("SELECT key, value FROM settings")
                    settings = {row['key']: row['value'] for row in cur.fetchall()}
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(settings),
                    'isBase64Encoded': False
                }
            
            elif entity == 'news':
                with conn.cursor(cursor_factory=RealDictCursor) as cur:
                    cur.execute("SELECT id, title, content, category, date FROM news ORDER BY date DESC")
                    news = [dict(row) for row in cur.fetchall()]
                    for item in news:
                        if isinstance(item['date'], date):
                            item['date'] = item['date'].isoformat()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(news),
                    'isBase64Encoded': False
                }
            
            elif entity == 'officials':
                with conn.cursor(cursor_factory=RealDictCursor) as cur:
                    cur.execute("SELECT id, name, role, description, icon, category, sort_order FROM officials ORDER BY sort_order")
                    officials = [dict(row) for row in cur.fetchall()]
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(officials),
                    'isBase64Encoded': False
                }
            
            elif entity == 'lubertsy_news':
                with conn.cursor(cursor_factory=RealDictCursor) as cur:
                    cur.execute("SELECT id, content, date FROM lubertsy_news ORDER BY date DESC")
                    news = [dict(row) for row in cur.fetchall()]
                    for item in news:
                        if isinstance(item['date'], date):
                            item['date'] = item['date'].isoformat()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(news),
                    'isBase64Encoded': False
                }
            
            elif entity == 'lubertsy_construction':
                with conn.cursor(cursor_factory=RealDictCursor) as cur:
                    cur.execute("SELECT id, name, status, is_completed FROM lubertsy_construction")
                    items = [dict(row) for row in cur.fetchall()]
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(items),
                    'isBase64Encoded': False
                }
            
            elif entity == 'construction_projects':
                with conn.cursor(cursor_factory=RealDictCursor) as cur:
                    cur.execute("SELECT id, name, progress, status, description, lead FROM construction_projects")
                    projects = [dict(row) for row in cur.fetchall()]
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(projects),
                    'isBase64Encoded': False
                }
            
            elif entity == 'role_requests':
                with conn.cursor(cursor_factory=RealDictCursor) as cur:
                    cur.execute("SELECT id, name, role, reason, status, created_at FROM role_requests ORDER BY created_at DESC")
                    requests = [dict(row) for row in cur.fetchall()]
                    for req in requests:
                        if hasattr(req['created_at'], 'isoformat'):
                            req['created_at'] = req['created_at'].isoformat()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(requests),
                    'isBase64Encoded': False
                }
            
            elif entity == 'army_news':
                with conn.cursor(cursor_factory=RealDictCursor) as cur:
                    cur.execute("SELECT id, title, content, date FROM army_news ORDER BY date DESC")
                    news = [dict(row) for row in cur.fetchall()]
                    for item in news:
                        if isinstance(item['date'], date):
                            item['date'] = item['date'].isoformat()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(news),
                    'isBase64Encoded': False
                }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            if entity == 'news':
                with conn.cursor() as cur:
                    cur.execute(
                        "INSERT INTO news (title, content, category, date) VALUES (%s, %s, %s, %s)",
                        (body_data['title'], body_data['content'], body_data['category'], body_data.get('date', date.today()))
                    )
                    conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'message': 'Новость добавлена'}),
                    'isBase64Encoded': False
                }
            
            elif entity == 'officials':
                with conn.cursor() as cur:
                    cur.execute(
                        "INSERT INTO officials (name, role, description, icon, category, sort_order) VALUES (%s, %s, %s, %s, %s, %s)",
                        (body_data['name'], body_data['role'], body_data.get('description', ''), body_data.get('icon', '👤'), body_data['category'], body_data.get('sort_order', 999))
                    )
                    conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'message': 'Должностное лицо добавлено'}),
                    'isBase64Encoded': False
                }
            
            elif entity == 'lubertsy_news':
                with conn.cursor() as cur:
                    cur.execute(
                        "INSERT INTO lubertsy_news (content, date) VALUES (%s, %s)",
                        (body_data['content'], body_data.get('date', date.today()))
                    )
                    conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'message': 'Новость города добавлена'}),
                    'isBase64Encoded': False
                }
            
            elif entity == 'lubertsy_construction':
                with conn.cursor() as cur:
                    cur.execute(
                        "INSERT INTO lubertsy_construction (name, status, is_completed) VALUES (%s, %s, %s)",
                        (body_data['name'], body_data['status'], body_data.get('is_completed', False))
                    )
                    conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'message': 'Объект строительства добавлен'}),
                    'isBase64Encoded': False
                }
            
            elif entity == 'construction_projects':
                with conn.cursor() as cur:
                    cur.execute(
                        "INSERT INTO construction_projects (name, progress, status, description, lead) VALUES (%s, %s, %s, %s, %s)",
                        (body_data['name'], body_data['progress'], body_data['status'], body_data.get('description', ''), body_data.get('lead', ''))
                    )
                    conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'message': 'Проект строительства добавлен'}),
                    'isBase64Encoded': False
                }
            
            elif entity == 'army_news':
                with conn.cursor() as cur:
                    cur.execute(
                        "INSERT INTO army_news (title, content, date) VALUES (%s, %s, %s)",
                        (body_data['title'], body_data['content'], body_data.get('date', date.today()))
                    )
                    conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'message': 'Новость армии добавлена'}),
                    'isBase64Encoded': False
                }
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            
            if entity == 'settings':
                with conn.cursor() as cur:
                    for key, value in body_data.items():
                        cur.execute(
                            "INSERT INTO settings (key, value) VALUES (%s, %s) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = CURRENT_TIMESTAMP",
                            (key, value)
                        )
                    conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'message': 'Настройки обновлены'}),
                    'isBase64Encoded': False
                }
            
            elif entity == 'officials':
                item_id = body_data.get('id')
                with conn.cursor() as cur:
                    cur.execute(
                        "UPDATE officials SET name = %s, role = %s, description = %s, category = %s WHERE id = %s",
                        (body_data['name'], body_data['role'], body_data.get('description', ''), body_data['category'], item_id)
                    )
                    conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'message': 'Должность обновлена'}),
                    'isBase64Encoded': False
                }
            
            elif entity == 'lubertsy_construction':
                item_id = body_data.get('id')
                with conn.cursor() as cur:
                    cur.execute(
                        "UPDATE lubertsy_construction SET name = %s, status = %s, is_completed = %s WHERE id = %s",
                        (body_data['name'], body_data['status'], body_data['is_completed'], item_id)
                    )
                    conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'message': 'Объект строительства обновлён'}),
                    'isBase64Encoded': False
                }
            
            elif entity == 'construction_projects':
                item_id = body_data.get('id')
                with conn.cursor() as cur:
                    cur.execute(
                        "UPDATE construction_projects SET name = %s, progress = %s, status = %s, description = %s, lead = %s WHERE id = %s",
                        (body_data['name'], body_data['progress'], body_data['status'], body_data.get('description', ''), body_data.get('lead', ''), item_id)
                    )
                    conn.commit()
                
                overall_avg_query = "SELECT ROUND(AVG(progress)) as avg_progress FROM construction_projects"
                with conn.cursor(cursor_factory=RealDictCursor) as cur:
                    cur.execute(overall_avg_query)
                    result = cur.fetchone()
                    avg_progress = int(result['avg_progress']) if result and result['avg_progress'] else 0
                
                with conn.cursor() as cur:
                    cur.execute(
                        "INSERT INTO settings (key, value) VALUES ('overall_construction_progress', %s) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value",
                        (str(avg_progress),)
                    )
                    conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'message': 'Проект обновлён'}),
                    'isBase64Encoded': False
                }
            
            elif entity == 'role_requests':
                item_id = body_data.get('id')
                new_status = body_data.get('status')
                with conn.cursor() as cur:
                    cur.execute(
                        "UPDATE role_requests SET status = %s, reviewed_at = CURRENT_TIMESTAMP WHERE id = %s",
                        (new_status, item_id)
                    )
                    conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'message': 'Статус заявки обновлён'}),
                    'isBase64Encoded': False
                }
        
        elif method == 'DELETE':
            body_data = json.loads(event.get('body', '{}'))
            item_id = body_data.get('id')
            
            table_map = {
                'news': 'news',
                'officials': 'officials',
                'lubertsy_news': 'lubertsy_news',
                'lubertsy_construction': 'lubertsy_construction',
                'construction_projects': 'construction_projects',
                'role_requests': 'role_requests',
                'army_news': 'army_news'
            }
            
            if entity in table_map:
                with conn.cursor() as cur:
                    cur.execute(f"DELETE FROM {table_map[entity]} WHERE id = %s", (item_id,))
                    conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'message': 'Удалено успешно'}),
                    'isBase64Encoded': False
                }
        
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Неверный запрос'}),
            'isBase64Encoded': False
        }
        
    finally:
        conn.close()
