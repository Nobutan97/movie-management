import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CourseForm from './CourseForm';
import CourseList from './CourseList';
import CourseStats from './CourseStats';
import VideoForm from './VideoForm';
import PropTypes from 'prop-types';
import './styles/AdminDashboard.css';
import { useTranslation } from 'react-i18next';

const AdminDashboard = ({ token }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  // レスポンシブ対応
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // データの取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // APIからデータを取得
        const [usersData, coursesData, videosData] = await Promise.all([
          fetch('/api/users').then(res => res.json()),
          fetch('/api/courses').then(res => res.json()),
          fetch('/api/videos').then(res => res.json())
        ]);
        setUsers(usersData);
        setCourses(coursesData);
        setVideos(videosData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 新規コースの作成
  const handleCreateCourse = async (courseData) => {
    try {
      setError(null);
      setSuccessMessage(null);

      // バリデーション
      if (!courseData.title.trim()) {
        throw new Error('コースタイトルは必須です');
      }

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
      setSuccessMessage('コースが正常に作成されました');
      navigate('/admin/courses');
      return { success: true, course: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      setError({
        message: 'コースの作成に失敗しました',
        details: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  };

  // 動画の追加
  const handleAddVideo = async (courseId, videoData) => {
    try {
      setError(null);
      setSuccessMessage(null);

      // バリデーション
      if (!videoData.title.trim()) {
        throw new Error('動画タイトルは必須です');
      }
      if (!videoData.video_url && !videoData.embed_code) {
        throw new Error('動画URLまたは埋め込みコードは必須です');
      }

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
      setSuccessMessage('動画が正常に追加されました');
      return { success: true, video: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      setError({
        message: '動画の追加に失敗しました',
        details: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  };

  // エラーメッセージのクリア
  const clearError = () => {
    setError(null);
  };

  // 成功メッセージのクリア
  const clearSuccessMessage = () => {
    setSuccessMessage(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ヘッダー */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">{t('admin.dashboard.title')}</h1>
            <button
              onClick={() => {
                // Implement logout functionality
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              {t('admin.dashboard.logout')}
            </button>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* タブナビゲーション */}
        <nav className="mb-8">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8">
              {['dashboard', 'users', 'courses', 'videos'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  {t(`admin.dashboard.tabs.${tab}`)}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* タブコンテンツ */}
        <div className="bg-white shadow rounded-lg p-6">
          {activeTab === 'dashboard' && (
            <DashboardContent users={users} courses={courses} videos={videos} />
          )}
          {activeTab === 'users' && (
            <UsersContent users={users} />
          )}
          {activeTab === 'courses' && (
            <CoursesContent courses={courses} />
          )}
          {activeTab === 'videos' && (
            <VideosContent videos={videos} />
          )}
        </div>
      </main>
    </div>
  );
};

// ダッシュボードコンテンツ
const DashboardContent = ({ users, courses, videos }) => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-6">{t('admin.dashboard.overview')}</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {t('admin.dashboard.totalUsers')}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {users.length}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {t('admin.dashboard.totalCourses')}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {courses.length}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {t('admin.dashboard.totalVideos')}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {videos.length}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ユーザー管理コンテンツ
const UsersContent = ({ users }) => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-6">{t('admin.dashboard.users')}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.dashboard.userId')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.dashboard.username')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.dashboard.email')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.dashboard.role')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.dashboard.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900">
                    {t('admin.dashboard.edit')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// コース管理コンテンツ
const CoursesContent = ({ courses }) => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-6">{t('admin.dashboard.courses')}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.dashboard.courseId')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.dashboard.title')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.dashboard.description')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.dashboard.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {course.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {course.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {course.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900">
                    {t('admin.dashboard.edit')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 動画管理コンテンツ
const VideosContent = ({ videos }) => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-6">{t('admin.dashboard.videos')}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.dashboard.videoId')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.dashboard.title')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.dashboard.duration')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.dashboard.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {videos.map((video) => (
              <tr key={video.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {video.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {video.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {video.duration}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900">
                    {t('admin.dashboard.edit')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

AdminDashboard.propTypes = {
  token: PropTypes.string.isRequired
};

DashboardContent.propTypes = {
  users: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  videos: PropTypes.array.isRequired
};

UsersContent.propTypes = {
  users: PropTypes.array.isRequired
};

CoursesContent.propTypes = {
  courses: PropTypes.array.isRequired
};

VideosContent.propTypes = {
  videos: PropTypes.array.isRequired
};

export default AdminDashboard; 