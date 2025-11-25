-- Создание первого администратора
-- Логин: admin
-- Пароль: cckpss2025
-- Хеш: SHA256 от "cckpss2025"

INSERT INTO admins (username, password_hash) 
VALUES ('admin', 'eac4d6e26b2be82e53da4a879c7b7e39f54a52f900a97b4af10cf6fac8b81c03')
ON CONFLICT (username) DO NOTHING;
