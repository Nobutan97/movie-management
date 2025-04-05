// AdminDashboard.jsx - 管理者ダッシュボードのメインコンポーネント
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import CourseForm from './CourseForm';
import CourseList from './CourseList';
import CourseStats from './CourseStats';
import VideoForm from './VideoForm';

const AdminDashboard = ({ token }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // コース一覧の取得
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/courses`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        setError('コースの取得に失敗しました: ' + err.message);
        setLoading(false);
      }
    };

    fetchCourses();
  }, [token]);

  // 新規コースの作成
  const handleCreateCourse = async (courseData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/courses`,
        courseData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setCourses([...courses, response.data]);
      navigate('/admin/courses');
      return { success: true, course: response.data };
    } catch (err) {
      setError('コースの作成に失敗しました: ' + err.message);
      return { success: false, error: err.message };
    }
  };

  // 動画の追加
  const handleAddVideo = async (courseId, videoData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/courses/${courseId}/videos`,
        videoData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      // コース一覧を更新
      const updatedCourses = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/courses`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setCourses(updatedCourses.data);
      return { success: true, video: response.data };
    } catch (err) {
      setError('動画の追加に失敗しました: ' + err.message);
      return { success: false, error: err.message };
    }
  };

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>管理者ダッシュボード</h1>
        <nav>
          <ul>
            <li>
              <Link to="/admin/courses">コース一覧</Link>
            </li>
            <li>
              <Link to="/admin/courses/new">新規コース作成</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="dashboard-content">
        <Routes>
          <Route 
            path="/" 
            element={<CourseList courses={courses} />} 
          />
          <Route 
            path="/courses" 
            element={<CourseList courses={courses} />} 
          />
          <Route 
            path="/courses/new" 
            element={<CourseForm onSubmit={handleCreateCourse} />} 
          />
          <Route 
            path="/courses/:courseId/videos/new" 
            element={<VideoForm onSubmit={handleAddVideo} />} 
          />
          <Route 
            path="/courses/:courseId/stats" 
            element={<CourseStats token={token} />} 
          />
        </Routes>
      </main>
    </div>
  );
};

// CourseForm.jsx - コース作成フォーム
const CourseForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const result = await onSubmit({
      title,
      description
    });

    setSubmitting(false);

    if (result.success) {
      navigate(`/admin/courses/${result.course.id}/videos/new`);
    }
  };

  return (
    <div className="course-form">
      <h2>新規コース作成</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">コースタイトル</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">コース説明</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/admin/courses')}>
            キャンセル
          </button>
          <button type="submit" disabled={submitting}>
            {submitting ? '作成中...' : 'コースを作成'}
          </button>
        </div>
      </form>
    </div>
  );
};

// VideoForm.jsx - 動画追加フォーム
const VideoForm = ({ onSubmit }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [videoType, setVideoType] = useState('youtube');
  const [videoUrl, setVideoUrl] = useState('');
  const [embedCode, setEmbedCode] = useState('');
  const [sequenceOrder, setSequenceOrder] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [showEmbedCode, setShowEmbedCode] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const result = await onSubmit(courseId, {
      title,
      description,
      duration: parseInt(duration) || 0,
      video_type: videoType,
      video_url: videoUrl,
      embed_code: embedCode,
      sequence_order: parseInt(sequenceOrder) || 1
    });

    setSubmitting(false);

    if (result.success) {
      // フォームをリセットして続けて追加できるようにする
      setTitle('');
      setDescription('');
      setDuration(0);
      setVideoUrl('');
      setEmbedCode('');
      setSequenceOrder(sequenceOrder + 1);
      
      // 成功メッセージを表示
      alert('動画を追加しました！続けて追加するか、コース一覧に戻ることができます。');
    }
  };

  // 動画タイプが変更された時の処理
  useEffect(() => {
    setShowEmbedCode(videoType === 'custom');
  }, [videoType]);

  return (
    <div className="video-form">
      <h2>動画の追加</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">動画タイトル</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">動画説明</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">動画時間（秒）</label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            min="0"
            required
          />
          <small>※動画の長さを秒単位で入力してください（例: 10分の場合は600）</small>
        </div>

        <div className="form-group">
          <label htmlFor="videoType">動画タイプ</label>
          <select
            id="videoType"
            value={videoType}
            onChange={(e) => setVideoType(e.target.value)}
          >
            <option value="youtube">YouTube</option>
            <option value="vimeo">Vimeo</option>
            <option value="mp4">MP4 (直接URL)</option>
            <option value="custom">カスタム埋め込み</option>
          </select>
        </div>

        {!showEmbedCode && (
          <div className="form-group">
            <label htmlFor="videoUrl">動画URL</label>
            <input
              type="url"
              id="videoUrl"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder={
                videoType === 'youtube'
                  ? 'https://www.youtube.com/watch?v=...'
                  : videoType === 'vimeo'
                  ? 'https://vimeo.com/...'
                  : 'https://example.com/video.mp4'
              }
              required
            />
          </div>
        )}

        {showEmbedCode && (
          <div className="form-group">
            <label htmlFor="embedCode">埋め込みコード</label>
            <textarea
              id="embedCode"
              value={embedCode}
              onChange={(e) => setEmbedCode(e.target.value)}
              rows={5}
              placeholder="<iframe src=... または <video>..."
              required
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="sequenceOrder">表示順序</label>
          <input
            type="number"
            id="sequenceOrder"
            value={sequenceOrder}
            onChange={(e) => setSequenceOrder(e.target.value)}
            min="1"
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/admin/courses')}>
            コース一覧に戻る
          </button>
          <button type="submit" disabled={submitting}>
            {submitting ? '追加中...' : '動画を追加'}
          </button>
        </div>
      </form>
    </div>
  );
};

// CourseStats.jsx - コースの視聴統計
const CourseStats = ({ token }) => {
  const { courseId } = useParams();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/stats/courses/${courseId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        setStats(response.data);
        setLoading(false);
      } catch (err) {
        setError('統計情報の取得に失敗しました: ' + err.message);
        setLoading(false);
      }
    };

    fetchStats();
  }, [courseId, token]);

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!stats) return <div>統計情報がありません</div>;

  // 時間をフォーマット（秒 → 時間:分:秒）
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}時間${minutes}分${remainingSeconds}秒`;
  };

  return (
    <div className="course-stats">
      <h2>コース視聴統計</h2>

      <div className="stats-summary">
        <div className="stat-card">
          <h3>総登録者数</h3>
          <p className="stat-value">{stats.total_enrollments}人</p>
        </div>

        <div className="stat-card">
          <h3>総視聴時間</h3>
          <p className="stat-value">{formatTime(stats.total_view_seconds)}</p>
        </div>

        <div className="stat-card">
          <h3>平均完了率</h3>
          <p className="stat-value">
            {stats.user_stats.length > 0
              ? Math.round(
                  stats.user_stats.reduce((sum, user) => sum + user.completion_percentage, 0) /
                    stats.user_stats.length
                )
              : 0}%
          </p>
        </div>
      </div>

      <h3>ユーザー別視聴統計</h3>
      <table className="stats-table">
        <thead>
          <tr>
            <th>ユーザー名</th>
            <th>メールアドレス</th>
            <th>視聴時間</th>
            <th>進捗率</th>
            <th>最終視聴日時</th>
          </tr>
        </thead>
        <tbody>
          {stats.user_stats.map((user) => (
            <tr key={user.user_id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{formatTime(user.total_seconds)}</td>
              <td>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${user.completion_percentage}%` }}
                  />
                  <span>{user.completion_percentage}%</span>
                </div>
              </td>
              <td>
                {user.last_viewed_at
                  ? new Date(user.last_viewed_at).toLocaleString()
                  : '未視聴'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
