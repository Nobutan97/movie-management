// ViewerDashboard.jsx - 視聴者用ダッシュボード
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CourseView from './CourseView';

const ViewerDashboard = ({ token, user }) => {
  const [courses, setCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 登録済みコース一覧の取得
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/my/courses`,
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

    // 利用可能な全コース一覧の取得
    const fetchAvailableCourses = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/courses`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        setAvailableCourses(response.data);
      } catch (err) {
        console.error('利用可能なコースの取得に失敗しました:', err);
      }
    };

    fetchEnrolledCourses();
    fetchAvailableCourses();
  }, [token]);

  // コースへの登録処理
  const handleEnrollCourse = async (courseId) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/enroll/${courseId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      // 登録済みコース一覧を更新
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/my/courses`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setCourses(response.data);
      
      // コース詳細ページに移動
      navigate(`/courses/${courseId}`);
    } catch (err) {
      setError('コースへの登録に失敗しました: ' + err.message);
    }
  };

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div className="error">{error}</div>;

  // 登録済みでないコースをフィルタリング
  const notEnrolledCourses = availableCourses.filter(
    availableCourse => !courses.some(course => course.id === availableCourse.id)
  );

  // 時間をフォーマット（秒 → 時間:分:秒）
  const formatTime = (seconds) => {
    if (!seconds) return '0分';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}時間${minutes}分`;
    } else {
      return `${minutes}分`;
    }
  };

  return (
    <div className="viewer-dashboard">
      <header className="dashboard-header">
        <h1>マイコース</h1>
        <div className="user-info">
          <span>{user.username}さん</span>
        </div>
      </header>

      <main className="dashboard-content">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h2>登録済みコース</h2>
                {courses.length === 0 ? (
                  <p>まだコースに登録されていません。下記の利用可能なコースから選択してください。</p>
                ) : (
                  <div className="course-grid">
                    {courses.map((course) => (
                      <div className="course-card" key={course.id}>
                        <h3>{course.title}</h3>
                        <div className="course-progress">
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{ width: `${course.completion_percentage || 0}%` }}
                            />
                          </div>
                          <span>{course.completion_percentage || 0}% 完了</span>
                        </div>
                        <p className="course-stats">
                          視聴時間: {formatTime(course.total_seconds || 0)}
                        </p>
                        <p className="last-viewed">
                          {course.last_viewed_at
                            ? `最終視聴: ${new Date(course.last_viewed_at).toLocaleDateString()}`
                            : '未視聴'}
                        </p>
                        <Link to={`/courses/${course.id}`} className="btn-continue">
                          続ける
                        </Link>
                      </div>
                    ))}
                  </div>
                )}

                <h2>利用可能なコース</h2>
                {notEnrolledCourses.length === 0 ? (
                  <p>現在、登録可能な新しいコースはありません。</p>
                ) : (
                  <div className="course-grid">
                    {notEnrolledCourses.map((course) => (
                      <div className="course-card available" key={course.id}>
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <button
                          onClick={() => handleEnrollCourse(course.id)}
                          className="btn-enroll"
                        >
                          登録する
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            }
          />
          <Route
            path="/courses/:courseId/*"
            element={<CourseView token={token} />}
          />
        </Routes>
      </main>
    </div>
  );
};

// CourseView.jsx - コース視聴ページ
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import VideoPlayer from './VideoPlayer';

const CourseView = ({ token }) => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // コース情報と動画一覧の取得
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/courses/${courseId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        setCourse(response.data);
        
        // コースに動画がある場合は最初の動画をアクティブに
        if (response.data.videos && response.data.videos.length > 0) {
          setActiveVideo(response.data.videos[0]);
        }
        
        setLoading(false);
      } catch (err) {
        setError('コース情報の取得に失敗しました: ' + err.message);
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId, token]);

  // 動画選択処理
  const handleSelectVideo = (video) => {
    setActiveVideo(video);
    navigate(`/courses/${courseId}/videos/${video.id}`);
  };

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!course) return <div>コースが見つかりません</div>;

  return (
    <div className="course-view">
      <header className="course-header">
        <button
          className="btn-back"
          onClick={() => navigate('/')}
        >
          ← コース一覧に戻る
        </button>
        <h1>{course.title}</h1>
      </header>

      <div className="course-content">
        <aside className="video-list">
          <h2>動画一覧</h2>
          <ul>
            {course.videos.map((video) => (
              <li
                key={video.id}
                className={activeVideo && activeVideo.id === video.id ? 'active' : ''}
                onClick={() => handleSelectVideo(video)}
              >
                <span className="video-title">{video.title}</span>
                <span className="video-duration">
                  {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                </span>
              </li>
            ))}
          </ul>
        </aside>

        <main className="video-container">
          <Routes>
            <Route
              path="/"
              element={
                activeVideo ? (
                  <VideoPlayer video={activeVideo} token={token} />
                ) : (
                  <div className="no-video">
                    <p>左側のリストから視聴する動画を選択してください</p>
                  </div>
                )
              }
            />
            <Route
              path="/videos/:videoId"
              element={<VideoPlayer video={activeVideo} token={token} />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default ViewerDashboard;
