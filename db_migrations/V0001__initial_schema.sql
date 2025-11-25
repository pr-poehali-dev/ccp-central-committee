-- Создание таблиц для портала ЦК КПСС

-- Таблица администраторов
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица настроек (для главного объявления, IP сервера и т.д.)
CREATE TABLE IF NOT EXISTS settings (
    key VARCHAR(100) PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица новостей государства
CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица структуры власти
CREATE TABLE IF NOT EXISTS officials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(10),
    category VARCHAR(50) NOT NULL,
    sort_order INTEGER DEFAULT 0
);

-- Таблица новостей города Люберцы
CREATE TABLE IF NOT EXISTS lubertsy_news (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица фотографий города Люберцы
CREATE TABLE IF NOT EXISTS lubertsy_photos (
    id SERIAL PRIMARY KEY,
    url VARCHAR(500) NOT NULL,
    description VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица статуса строительства Люберцы
CREATE TABLE IF NOT EXISTS lubertsy_construction (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE
);

-- Таблица строительных проектов
CREATE TABLE IF NOT EXISTS construction_projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    progress INTEGER DEFAULT 0,
    status VARCHAR(50) NOT NULL,
    description TEXT,
    lead VARCHAR(100)
);

-- Таблица фотографий строительства
CREATE TABLE IF NOT EXISTS construction_photos (
    id SERIAL PRIMARY KEY,
    url VARCHAR(500) NOT NULL,
    description VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица заявок на роли
CREATE TABLE IF NOT EXISTS role_requests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    reason TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP
);

-- Таблица новостей армии
CREATE TABLE IF NOT EXISTS army_news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица станций метро
CREATE TABLE IF NOT EXISTS metro_stations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    line_number INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL
);

-- Вставка начальных данных
INSERT INTO settings (key, value) VALUES
    ('main_announcement', 'Граждане! Официальный портал государства ЦК КПСС запущен в эксплуатацию. Здесь вы можете ознакомиться со структурой власти, новостями государства, подать заявку на получение роли и следить за строительством городов.'),
    ('server_ip', '3PM3511.aternos.me:51574'),
    ('lubertsy_head_name', 'Вагнер'),
    ('lubertsy_head_role', 'Главный Бригадир городского округа Люберцы'),
    ('lubertsy_status', 'active'),
    ('lubertsy_progress', '35'),
    ('lubertsy_start_date', '15 ноября 2025'),
    ('overall_construction_progress', '23'),
    ('metro_chief_name', 'Денис'),
    ('army_chief_name', 'Даня')
ON CONFLICT (key) DO NOTHING;

-- Вставка должностных лиц
INSERT INTO officials (name, role, description, icon, category, sort_order) VALUES
    ('Сталин', 'ГенСек ЦК КПСС', 'Генеральный Секретарь Центрального Комитета Коммунистической Партии Советского Союза', '⭐', 'government', 1),
    ('Алексей', '1й Зам ГенСека ЦК КПСС', 'Первый заместитель Генерального Секретаря', '🎖️', 'government', 2),
    ('Вагнер', 'Главный Бригадир городского округа Люберцы', 'Руководит строительством и развитием города', '🏗️', 'leadership', 3),
    ('Денис', 'Начальник Метрополитена', 'Управление транспортной системой государства', '🚇', 'leadership', 4),
    ('Даня', 'НарКом Армии', 'Народный Комиссар Армии', '⚔️', 'leadership', 5),
    ('Блохин', 'НарКом ТяжПрома', 'Народный Комиссар Тяжёлой Промышленности', '⚙️', 'leadership', 6),
    ('Илья', 'Глава Городского Образования "Энгельс"', 'Руководство городом Энгельс', '🏛️', 'leadership', 7),
    ('Егор', 'Гражданин', '', '👤', 'citizens', 8),
    ('Седой', 'Гражданин', '', '👤', 'citizens', 9),
    ('Матвей', 'Гражданин', '', '👤', 'citizens', 10),
    ('Беляев', 'Гражданин', '', '👤', 'citizens', 11),
    ('ТВ', 'Гражданин', '', '👤', 'citizens', 12)
ON CONFLICT DO NOTHING;

-- Вставка новостей
INSERT INTO news (title, content, category, date) VALUES
    ('Запуск официального портала государства', 'Генеральный Секретарь ЦК КПСС объявил о запуске официального информационного портала государства. Граждане получили доступ к структуре власти, новостям и возможности подачи заявок на роли.', 'технологии', '2025-11-25'),
    ('Утверждён государственный гимн ЦК КПСС', 'Верховным Советом утверждён текст государственного гимна. Все граждане обязаны знать слова гимна наизусть.', 'культура', '2025-11-25')
ON CONFLICT DO NOTHING;

-- Вставка новостей Люберцы
INSERT INTO lubertsy_news (content, date) VALUES
    ('Завершено строительство центральной площади города. Открытие состоится в ближайшие дни.', '2025-11-20'),
    ('Начаты работы по прокладке первой линии метрополитена до станции "Люберцы".', '2025-11-18')
ON CONFLICT DO NOTHING;

-- Вставка статуса строительства Люберцы
INSERT INTO lubertsy_construction (name, status, is_completed) VALUES
    ('Центральная площадь', 'Завершено', TRUE),
    ('Административное здание', 'Завершено', TRUE),
    ('Жилой квартал №1', 'В процессе', FALSE),
    ('Станция метро "Люберцы"', 'В процессе', FALSE),
    ('Промышленная зона', 'В процессе', FALSE)
ON CONFLICT DO NOTHING;

-- Вставка строительных проектов
INSERT INTO construction_projects (name, progress, status, description, lead) VALUES
    ('Городской округ Люберцы', 35, 'Активно', 'Строительство жилого района, центральной площади и инфраструктуры', 'Вагнер'),
    ('Метрополитен - Линия 1', 20, 'В процессе', 'Прокладка тоннелей и строительство станции "Люберцы"', 'Денис'),
    ('Город Энгельс', 15, 'Начато', 'Планирование и начало строительства второго городского образования', 'Илья')
ON CONFLICT DO NOTHING;

-- Вставка станций метро
INSERT INTO metro_stations (name, line_number, status) VALUES
    ('Люберцы', 1, 'В разработке')
ON CONFLICT DO NOTHING;

-- Создание индексов для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);
CREATE INDEX IF NOT EXISTS idx_news_date ON news(date DESC);
CREATE INDEX IF NOT EXISTS idx_officials_category ON officials(category, sort_order);
CREATE INDEX IF NOT EXISTS idx_role_requests_status ON role_requests(status);
CREATE INDEX IF NOT EXISTS idx_construction_projects_status ON construction_projects(status);
