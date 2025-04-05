// app.js - メインサーバーファイル
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

// データベース接続設定
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'videotracking',
  password: 'password',
  port: 5432,
});

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// ミドルウェア
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// 認証ミドルウェア
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: '認証トークンがありません' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: '無効なトークンです' });
    req.user = user;
    next();
  });
};

// 管理者権限確認ミドルウェア
const isAdmin = (req, res, next) => {
  if (!req.user.is_admin) {
    return res.status(403).json({ error: '管理者権限が必要です' });
  }
  next();
};

// ユーザー登録 API
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // パスワードハッシュ化
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // ユーザー登録
    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email, is_admin',
      [username, email, passwordHash]
    );

    const user = result.rows[0];

    // JWTトークン生成
    const token = jwt.sign(
      { id: user.id, username: user.username, is_admin: user.is_admin },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ログイン API
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // ユーザー検索
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'ユーザーが見つかりません' });
    }

    // パスワード検証
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'パスワードが正しくありません' });
    }

    // JWTトークン生成
    const token = jwt.sign(
      { id: user.id, username: user.username, is_admin: user.is_admin },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        is_admin: user.is_admin
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// コース作成 API（管理者のみ）
app.post('/api/courses', authenticate, isAdmin, async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'INSERT INTO courses (title, description, created_by) VALUES ($1, $2, $3) RETURNING *',
      [title, description, userId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 動画追加 API（管理者のみ）
app.post('/api/courses/:courseId/videos', authenticate, isAdmin, async (req, res) => {
  const { courseId } = req.params;
  const { title, description, duration, video_type, video_url, embed_code, sequence_order } = req.body;

  try {
    // コースが存在するか確認
    const courseCheck = await pool.query('SELECT * FROM courses WHERE id = $1', [courseId]);
    if (courseCheck.rows.length === 0) {
      return res.status(404).json({ error: 'コースが見つかりません' });
    }

    const result = await pool.query(
      `INSERT INTO videos 
      (course_id, title, description, duration, video_type, video_url, embed_code, sequence_order) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
      RETURNING *`,
      [courseId, title, description, duration, video_type, video_url, embed_code, sequence_order]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// コース一覧取得 API
app.get('/api/courses', authenticate, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM courses ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// コース詳細取得 API
app.get('/api/courses/:courseId', authenticate, async (req, res) => {
  const { courseId } = req.params;

  try {
    // コース情報を取得
    const courseResult = await pool.query('SELECT * FROM courses WHERE id = $1', [courseId]);
    if (courseResult.rows.length === 0) {
      return res.status(404).json({ error: 'コースが見つかりません' });
    }
    
    // コースに属する動画一覧を取得
    const videosResult = await pool.query(
      'SELECT * FROM videos WHERE course_id = $1 ORDER BY sequence_order, id',
      [courseId]
    );

    // レスポンスをフォーマット
    const course = courseResult.rows[0];
    course.videos = videosResult.rows;

    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// コース登録 API（受講者用）
app.post('/api/enroll/:courseId', authenticate, async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.id;

  try {
    // コースが存在するか確認
    const courseCheck = await pool.query('SELECT * FROM courses WHERE id = $1', [courseId]);
    if (courseCheck.rows.length === 0) {
      return res.status(404).json({ error: 'コースが見つかりません' });
    }

    // すでに登録済みかチェック
    const enrollCheck = await pool.query(
      'SELECT * FROM enrollments WHERE user_id = $1 AND course_id = $2',
      [userId, courseId]
    );

    if (enrollCheck.rows.length > 0) {
      return res.status(400).json({ error: 'すでに登録済みです' });
    }

    // 登録処理
    await pool.query(
      'INSERT INTO enrollments (user_id, course_id) VALUES ($1, $2)',
      [userId, courseId]
    );

    // 視聴統計テーブルに初期レコードを作成
    await pool.query(
      'INSERT INTO viewing_stats (user_id, course_id) VALUES ($1, $2)',
      [userId, courseId]
    );

    res.json({ success: true, message: 'コースに登録しました' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 視聴開始ログ記録 API
app.post('/api/view-logs/start', authenticate, async (req, res) => {
  const { videoId } = req.body;
  const userId = req.user.id;

  try {
    // 動画が存在するか確認
    const videoCheck = await pool.query('SELECT * FROM videos WHERE id = $1', [videoId]);
    if (videoCheck.rows.length === 0) {
      return res.status(404).json({ error: '動画が見つかりません' });
    }

    // ユーザーがこの動画のコースに登録されているか確認
    const enrollCheck = await pool.query(
      `SELECT e.* FROM enrollments e
       JOIN videos v ON v.course_id = e.course_id
       WHERE e.user_id = $1 AND v.id = $2`,
      [userId, videoId]
    );

    if (enrollCheck.rows.length === 0) {
      return res.status(403).json({ error: 'このコースに登録されていません' });
    }

    // 視聴開始ログを記録
    const startTime = new Date();
    const result = await pool.query(
      'INSERT INTO view_logs (user_id, video_id, started_at) VALUES ($1, $2, $3) RETURNING id',
      [userId, videoId, startTime]
    );

    res.json({
      log_id: result.rows[0].id,
      started_at: startTime
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 視聴終了ログ更新 API
app.put('/api/view-logs/end/:logId', authenticate, async (req, res) => {
  const { logId } = req.params;
  const { duration_seconds, progress_percentage, completed } = req.body;
  const userId = req.user.id;

  try {
    // ログが存在し、このユーザーのものか確認
    const logCheck = await pool.query(
      'SELECT * FROM view_logs WHERE id = $1 AND user_id = $2',
      [logId, userId]
    );

    if (logCheck.rows.length === 0) {
      return res.status(404).json({ error: '視聴ログが見つかりません' });
    }

    const log = logCheck.rows[0];
    const endTime = new Date();

    // 視聴ログを更新
    await pool.query(
      `UPDATE view_logs 
       SET ended_at = $1, duration_seconds = $2, progress_percentage = $3, completed = $4
       WHERE id = $5`,
      [endTime, duration_seconds, progress_percentage, completed, logId]
    );

    // 動画のコースIDを取得
    const videoResult = await pool.query(
      'SELECT course_id FROM videos WHERE id = $1',
      [log.video_id]
    );
    
    const courseId = videoResult.rows[0].course_id;

    // 集計テーブルを更新
    await pool.query(
      `UPDATE viewing_stats 
       SET total_seconds = total_seconds + $1, 
           last_viewed_at = $2, 
           updated_at = $2
       WHERE user_id = $3 AND course_id = $4`,
      [duration_seconds, endTime, userId, courseId]
    );

    // コース内の全動画の合計時間を取得
    const totalDurationResult = await pool.query(
      'SELECT SUM(duration) as total_duration FROM videos WHERE course_id = $1',
      [courseId]
    );
    
    const totalDuration = totalDurationResult.rows[0].total_duration || 0;

    // このユーザーのコース内視聴合計時間を取得
    const userViewTimeResult = await pool.query(
      'SELECT total_seconds FROM viewing_stats WHERE user_id = $1 AND course_id = $2',
      [userId, courseId]
    );
    
    const totalSeconds = userViewTimeResult.rows[0].total_seconds || 0;

    // 完了率を計算して更新（総動画時間に対する視聴時間の割合）
    if (totalDuration > 0) {
      const completionPercentage = Math.min(100, Math.round((totalSeconds / totalDuration) * 100));
      
      await pool.query(
        `UPDATE viewing_stats 
         SET completion_percentage = $1
         WHERE user_id = $2 AND course_id = $3`,
        [completionPercentage, userId, courseId]
      );
    }

    res.json({
      success: true,
      message: '視聴ログを更新しました'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// コース別視聴統計取得 API（管理者用）
app.get('/api/stats/courses/:courseId', authenticate, isAdmin, async (req, res) => {
  const { courseId } = req.params;

  try {
    // コースが存在するか確認
    const courseCheck = await pool.query('SELECT * FROM courses WHERE id = $1', [courseId]);
    if (courseCheck.rows.length === 0) {
      return res.status(404).json({ error: 'コースが見つかりません' });
    }

    // ユーザーごとの視聴統計を取得
    const result = await pool.query(
      `SELECT vs.*, u.username, u.email 
       FROM viewing_stats vs
       JOIN users u ON u.id = vs.user_id
       WHERE vs.course_id = $1
       ORDER BY vs.total_seconds DESC`,
      [courseId]
    );

    // コースの登録者数を取得
    const enrollmentCountResult = await pool.query(
      'SELECT COUNT(*) FROM enrollments WHERE course_id = $1',
      [courseId]
    );

    // コースの総視聴時間を取得
    const totalViewTimeResult = await pool.query(
      'SELECT SUM(total_seconds) FROM viewing_stats WHERE course_id = $1',
      [courseId]
    );

    res.json({
      course_id: parseInt(courseId),
      total_enrollments: parseInt(enrollmentCountResult.rows[0].count),
      total_view_seconds: parseInt(totalViewTimeResult.rows[0].sum || 0),
      user_stats: result.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ユーザー別のコース進捗状況取得 API
app.get('/api/my/courses', authenticate, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `SELECT c.*, vs.total_seconds, vs.completion_percentage, vs.last_viewed_at
       FROM courses c
       JOIN enrollments e ON e.course_id = c.id
       LEFT JOIN viewing_stats vs ON vs.course_id = c.id AND vs.user_id = e.user_id
       WHERE e.user_id = $1
       ORDER BY vs.last_viewed_at DESC NULLS LAST`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`サーバーが起動しました: http://localhost:${PORT}`);
});

module.exports = app;
