import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

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

CourseStats.propTypes = {
  token: PropTypes.string.isRequired
};

export default CourseStats; 