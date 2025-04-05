-- データベースの作成
CREATE DATABASE video_tracking_management
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'ja_JP.UTF-8'
    LC_CTYPE = 'ja_JP.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- スキーマの作成
CREATE SCHEMA IF NOT EXISTS vtm;

-- ユーザーテーブル
CREATE TABLE vtm.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    profile_image_url VARCHAR(255),
    bio TEXT,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- カテゴリーテーブル
CREATE TABLE vtm.categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- タグテーブル
CREATE TABLE vtm.tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- コーステーブル
CREATE TABLE vtm.courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category_id INTEGER REFERENCES vtm.categories(id),
    created_by INTEGER REFERENCES vtm.users(id),
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
) PARTITION BY RANGE (created_at);

-- コースパーティション
CREATE TABLE vtm.courses_2023 PARTITION OF vtm.courses
    FOR VALUES FROM ('2023-01-01') TO ('2024-01-01');
CREATE TABLE vtm.courses_2024 PARTITION OF vtm.courses
    FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

-- コースとタグの関連テーブル
CREATE TABLE vtm.course_tags (
    course_id INTEGER REFERENCES vtm.courses(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES vtm.tags(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (course_id, tag_id)
);

-- ビデオテーブル
CREATE TABLE vtm.videos (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES vtm.courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    url VARCHAR(255) NOT NULL,
    subtitle_url VARCHAR(255),
    duration INTEGER NOT NULL,
    sequence INTEGER NOT NULL,
    is_preview BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 視聴履歴テーブル
CREATE TABLE vtm.viewing_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES vtm.users(id) ON DELETE CASCADE,
    video_id INTEGER REFERENCES vtm.videos(id) ON DELETE CASCADE,
    progress INTEGER NOT NULL DEFAULT 0,
    total_watch_time INTEGER DEFAULT 0,
    last_watched_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
) PARTITION BY RANGE (created_at);

-- 視聴履歴パーティション
CREATE TABLE vtm.viewing_history_2023 PARTITION OF vtm.viewing_history
    FOR VALUES FROM ('2023-01-01') TO ('2024-01-01');
CREATE TABLE vtm.viewing_history_2024 PARTITION OF vtm.viewing_history
    FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

-- お気に入りテーブル
CREATE TABLE vtm.favorites (
    user_id INTEGER REFERENCES vtm.users(id) ON DELETE CASCADE,
    video_id INTEGER REFERENCES vtm.videos(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, video_id)
);

-- インデックスの作成
CREATE INDEX idx_users_username ON vtm.users(username);
CREATE INDEX idx_users_email ON vtm.users(email);
CREATE INDEX idx_courses_created_by ON vtm.courses(created_by);
CREATE INDEX idx_courses_category ON vtm.courses(category_id);
CREATE INDEX idx_videos_course_id ON vtm.videos(course_id);
CREATE INDEX idx_viewing_history_user_video ON vtm.viewing_history(user_id, video_id);
CREATE INDEX idx_viewing_history_created_at ON vtm.viewing_history(created_at);
CREATE INDEX idx_favorites_user_id ON vtm.favorites(user_id);
CREATE INDEX idx_favorites_video_id ON vtm.favorites(video_id);
CREATE INDEX idx_course_tags_course_id ON vtm.course_tags(course_id);
CREATE INDEX idx_course_tags_tag_id ON vtm.course_tags(tag_id);

-- トリガー関数の作成
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 更新日時トリガーの作成
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON vtm.users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
    BEFORE UPDATE ON vtm.courses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_videos_updated_at
    BEFORE UPDATE ON vtm.videos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 視聴時間更新トリガー
CREATE OR REPLACE FUNCTION update_watch_time()
RETURNS TRIGGER AS $$
BEGIN
    NEW.total_watch_time = COALESCE(OLD.total_watch_time, 0) + 
        EXTRACT(EPOCH FROM (NEW.last_watched_at - OLD.last_watched_at));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_viewing_history_watch_time
    BEFORE UPDATE ON vtm.viewing_history
    FOR EACH ROW
    EXECUTE FUNCTION update_watch_time();

-- バックアップ用の関数
CREATE OR REPLACE FUNCTION vtm.backup_tables()
RETURNS void AS $$
BEGIN
    -- バックアップテーブルの作成
    CREATE TABLE IF NOT EXISTS vtm.users_backup (LIKE vtm.users INCLUDING ALL);
    CREATE TABLE IF NOT EXISTS vtm.categories_backup (LIKE vtm.categories INCLUDING ALL);
    CREATE TABLE IF NOT EXISTS vtm.tags_backup (LIKE vtm.tags INCLUDING ALL);
    CREATE TABLE IF NOT EXISTS vtm.courses_backup (LIKE vtm.courses INCLUDING ALL);
    CREATE TABLE IF NOT EXISTS vtm.course_tags_backup (LIKE vtm.course_tags INCLUDING ALL);
    CREATE TABLE IF NOT EXISTS vtm.videos_backup (LIKE vtm.videos INCLUDING ALL);
    CREATE TABLE IF NOT EXISTS vtm.viewing_history_backup (LIKE vtm.viewing_history INCLUDING ALL);
    CREATE TABLE IF NOT EXISTS vtm.favorites_backup (LIKE vtm.favorites INCLUDING ALL);

    -- データのコピー
    TRUNCATE vtm.users_backup;
    TRUNCATE vtm.categories_backup;
    TRUNCATE vtm.tags_backup;
    TRUNCATE vtm.courses_backup;
    TRUNCATE vtm.course_tags_backup;
    TRUNCATE vtm.videos_backup;
    TRUNCATE vtm.viewing_history_backup;
    TRUNCATE vtm.favorites_backup;

    INSERT INTO vtm.users_backup SELECT * FROM vtm.users;
    INSERT INTO vtm.categories_backup SELECT * FROM vtm.categories;
    INSERT INTO vtm.tags_backup SELECT * FROM vtm.tags;
    INSERT INTO vtm.courses_backup SELECT * FROM vtm.courses;
    INSERT INTO vtm.course_tags_backup SELECT * FROM vtm.course_tags;
    INSERT INTO vtm.videos_backup SELECT * FROM vtm.videos;
    INSERT INTO vtm.viewing_history_backup SELECT * FROM vtm.viewing_history;
    INSERT INTO vtm.favorites_backup SELECT * FROM vtm.favorites;
END;
$$ LANGUAGE plpgsql;

-- マイグレーション管理テーブル
CREATE TABLE vtm.migrations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- マイグレーション関数
CREATE OR REPLACE FUNCTION vtm.apply_migration(migration_name VARCHAR, migration_sql TEXT)
RETURNS void AS $$
BEGIN
    -- マイグレーションが未適用の場合のみ実行
    IF NOT EXISTS (SELECT 1 FROM vtm.migrations WHERE name = migration_name) THEN
        EXECUTE migration_sql;
        INSERT INTO vtm.migrations (name) VALUES (migration_name);
    END IF;
END;
$$ LANGUAGE plpgsql; 