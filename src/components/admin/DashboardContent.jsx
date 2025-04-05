import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { 
  Users, 
  BookOpen, 
  Clock, 
  Award,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';

const DashboardContent = ({ users, courses, videos }) => {
  const { t } = useTranslation();

  const stats = [
    {
      title: t('admin.dashboard.totalUsers'),
      value: users.length,
      icon: Users,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: t('admin.dashboard.totalCourses'),
      value: courses.length,
      icon: BookOpen,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: t('admin.dashboard.totalVideos'),
      value: videos.length,
      icon: Monitor,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: t('admin.dashboard.totalViews'),
      value: videos.reduce((acc, video) => acc + video.views, 0),
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      title: t('admin.dashboard.courseCompletionRate'),
      value: '68%',
      icon: Award,
      color: 'bg-pink-100 text-pink-600'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      title: t('admin.dashboard.newUser'),
      time: '10分前',
      icon: Users
    },
    {
      id: 2,
      title: t('admin.dashboard.newCourse'),
      time: '30分前',
      icon: BookOpen
    },
    {
      id: 3,
      title: t('admin.dashboard.newVideo'),
      time: '1時間前',
      icon: Monitor
    }
  ];

  // 統計カードコンポーネント
  const StatCard = ({ title, value, subValue, icon: Icon }) => (
    <div className="bg-white rounded-lg shadow p-6 flex items-center">
      <div className="mr-4">
        <Icon size={24} className="text-blue-500" />
      </div>
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <div className="text-2xl font-bold">{value}</div>
        {subValue && <div className="text-xs text-gray-500 mt-1">{subValue}</div>}
      </div>
    </div>
  );

  // デバイス統計アイテムコンポーネント
  const DeviceStatItem = ({ icon: Icon, label, value }) => (
    <div>
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center">
          <Icon size={20} className="text-gray-500 mr-2" />
          <span className="text-sm">{label}</span>
        </div>
        <span className="text-sm font-medium">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            subValue={stat.subValue}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* グラフセクション */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="chart-container">
          <h3 className="text-lg font-medium mb-4">{t('admin.dashboard.userGrowth')}</h3>
          {/* ここにユーザー成長グラフを追加 */}
          <div className="h-64 bg-gray-100 rounded"></div>
        </div>
        <div className="chart-container">
          <h3 className="text-lg font-medium mb-4">{t('admin.dashboard.coursePerformance')}</h3>
          {/* ここにコースパフォーマンスグラフを追加 */}
          <div className="h-64 bg-gray-100 rounded"></div>
        </div>
      </div>

      {/* アクティビティフィード */}
      <div className="activity-feed">
        <h3 className="text-lg font-medium mb-4">{t('admin.dashboard.recentActivities')}</h3>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className={`activity-icon ${activity.icon === Users ? 'bg-blue-100 text-blue-600' : 
                activity.icon === BookOpen ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'}`}>
                <activity.icon className="w-4 h-4" />
              </div>
              <div className="activity-content">
                <div className="activity-title">{activity.title}</div>
                <div className="activity-time">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* デバイス分布 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-bold mb-6">デバイス分布</h2>
        <div className="space-y-6">
          <DeviceStatItem
            icon={Monitor}
            label="デスクトップ"
            value={64}
          />
          <DeviceStatItem
            icon={Smartphone}
            label="モバイル"
            value={28}
          />
          <DeviceStatItem
            icon={Tablet}
            label="タブレット"
            value={8}
          />
        </div>
      </div>
    </div>
  );
};

DashboardContent.propTypes = {
  users: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  videos: PropTypes.array.isRequired
};

export default DashboardContent; 