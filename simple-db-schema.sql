-- ユーザーテーブル
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- コーステーブル
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 動画テーブル
CREATE TABLE videos (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES courses(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  duration INTEGER, -- 秒単位
  video_type VARCHAR(50) NOT NULL, -- youtube, vimeo, mp4など
  video_url TEXT NOT NULL, -- 動画のURL、埋め込みコードなど
  embed_code TEXT, -- カスタム埋め込みコード（オプション）
  sequence_order INTEGER, -- コース内での順序
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 受講者登録テーブル
CREATE TABLE enrollments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  course_id INTEGER REFERENCES courses(id),
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, course_id)
);

-- 視聴ログテーブル
CREATE TABLE view_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  video_id INTEGER REFERENCES videos(id),
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  duration_seconds INTEGER, -- 実際の視聴時間（秒）
  progress_percentage INTEGER, -- 視聴進捗（％）
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 視聴集計テーブル（クエリ最適化用）
CREATE TABLE viewing_stats (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  course_id INTEGER REFERENCES courses(id),
  total_seconds INTEGER DEFAULT 0,
  last_viewed_at TIMESTAMP,
  completion_percentage INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, course_id)
);

-- インデックスの作成
CREATE INDEX idx_view_logs_user_id ON view_logs(user_id);
CREATE INDEX idx_view_logs_video_id ON view_logs(video_id);
CREATE INDEX idx_videos_course_id ON videos(course_id);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX idx_viewing_stats_course_id ON viewing_stats(course_id);
