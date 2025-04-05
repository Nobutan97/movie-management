const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const winston = require('winston');
const NodeCache = require('node-cache');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

// 環境変数の設定
require('dotenv').config();

// ロガーの設定
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// キャッシュの設定
const cache = new NodeCache({
  stdTTL: 600, // デフォルトのTTL（秒）
  checkperiod: 120 // 期限切れチェック間隔（秒）
});

// データベース接続プールの設定
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// レート制限の設定
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分
  max: 100, // IPごとのリクエスト制限
  message: 'リクエスト制限を超えました。しばらく待ってから再度お試しください。'
});

const app = express();

// ミドルウェアの設定
app.use(helmet()); // セキュリティヘッダーの設定
app.use(compression()); // レスポンスの圧縮
app.use(cors()); // CORSの設定
app.use(express.json()); // JSONパース
app.use(morgan('combined', { stream: { write: message => logger.info(message) } })); // アクセスログ
app.use(limiter); // レート制限

// エラーハンドリングミドルウェア
const errorHandler = (err, req, res, next) => {
  logger.error('エラーが発生しました:', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    ip: req.ip
  });

  res.status(err.status || 500).json({
    error: {
      message: err.message || 'サーバーエラーが発生しました',
      code: err.code || 'INTERNAL_SERVER_ERROR'
    }
  });
};

// JWT認証ミドルウェア
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: '認証トークンが必要です' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      logger.warn('無効なトークン:', { token, error: err.message });
      return res.status(403).json({ error: '無効なトークンです' });
    }
    req.user = user;
    next();
  });
};

// 管理者権限チェックミドルウェア
const checkAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    logger.warn('管理者権限のないアクセス:', { user: req.user });
    return res.status(403).json({ error: '管理者権限が必要です' });
  }
  next();
};

// キャッシュミドルウェア
const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    const key = req.originalUrl || req.url;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      logger.info('キャッシュからレスポンスを返します:', { key });
      return res.json(cachedResponse);
    }

    res.originalJson = res.json;
    res.json = (body) => {
      cache.set(key, body, duration);
      res.originalJson(body);
    };
    next();
  };
};

// ルートハンドラーの例
app.get('/api/courses', cacheMiddleware(300), async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM courses ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.post('/api/courses', authenticateToken, checkAdmin, async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const result = await pool.query(
      'INSERT INTO courses (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    cache.del('/api/courses'); // キャッシュの無効化
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// エラーハンドラーの適用
app.use(errorHandler);

// サーバーの起動
const PORT = process.env.PORT || 6250;
app.listen(PORT, () => {
  logger.info(`サーバーが起動しました: http://localhost:${PORT}`);
});

// グレースフルシャットダウン
process.on('SIGTERM', () => {
  logger.info('SIGTERMシグナルを受信しました。グレースフルシャットダウンを開始します。');
  server.close(() => {
    logger.info('サーバーをシャットダウンしました。');
    pool.end(() => {
      logger.info('データベース接続を終了しました。');
      process.exit(0);
    });
  });
}); 