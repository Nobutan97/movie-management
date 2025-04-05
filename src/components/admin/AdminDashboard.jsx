import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Film, 
  Users, 
  BarChart2, 
  Settings, 
  LogOut,
  ChevronRight,
  Bell,
  User
} from 'lucide-react';
import DashboardContent from './DashboardContent';
import UsersContent from './UsersContent';
import CoursesContent from './CoursesContent';
import './styles/AdminDashboard.css';

const AdminDashboard = () => {
  // 状態管理
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // データの状態
  const [userData, setUserData] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // サイドバーアイテムの設定
  const sidebarItems = [
    { id: 'dashboard', icon: Home, text: 'ダッシュボード' },
    { id: 'courses', icon: Film, text: 'コース管理' },
    { id: 'users', icon: Users, text: 'ユーザー管理' },
    { id: 'analytics', icon: BarChart2, text: '統計・分析' },
    { id: 'settings', icon: Settings, text: '設定' }
  ];

  // サイドバーアイテムコンポーネント
  const SidebarItem = ({ icon: Icon, text, active, onClick }) => (
    <li>
      <button
        className={`flex items-center w-full p-2 rounded-md transition-colors ${
          active ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
        }`}
        onClick={onClick}
      >
        <Icon size={20} className="shrink-0" />
        {sidebarOpen && <span className="ml-3">{text}</span>}
      </button>
    </li>
  );

  // サイドバーコンポーネント
  const Sidebar = () => (
    <div className={`bg-gray-900 text-white h-screen flex flex-col ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 fixed`}>
      <div className="p-4 border-b border-gray-700 flex items-center">
        {sidebarOpen ? (
          <h1 className="text-xl font-bold">管理パネル</h1>
        ) : (
          <Film size={24} />
        )}
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {sidebarItems.map(item => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              text={item.text}
              active={activeSection === item.id}
              onClick={() => setActiveSection(item.id)}
            />
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button className="flex items-center text-gray-400 hover:text-white transition-colors w-full">
          <LogOut size={20} className="shrink-0" />
          {sidebarOpen && <span className="ml-2">ログアウト</span>}
        </button>
      </div>
    </div>
  );

  // ヘッダーコンポーネント
  const Header = () => (
    <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center">
        <button
          className="text-gray-500 hover:text-gray-700 focus:outline-none mr-4"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <ChevronRight size={24} /> : <ChevronRight size={24} className="transform rotate-180" />}
        </button>

        <h1 className="text-xl font-semibold text-gray-800">
          {activeSection === 'dashboard' && 'ダッシュボード'}
          {activeSection === 'courses' && 'コース管理'}
          {activeSection === 'users' && 'ユーザー管理'}
          {activeSection === 'analytics' && '統計・分析'}
          {activeSection === 'settings' && 'システム設定'}
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="text-gray-600 hover:text-gray-900 focus:outline-none">
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {notifications.length}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center">
          <div className="flex items-center mr-2">
            {userData?.avatar ? (
              <img
                src={userData.avatar}
                alt={userData.name}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                <User size={20} />
              </div>
            )}
          </div>
          <div className="text-sm hidden md:block">
            <p className="font-medium text-gray-800">{userData?.name || 'ユーザー名'}</p>
            <p className="text-gray-500">{userData?.role || '管理者'}</p>
          </div>
        </div>
      </div>
    </header>
  );

  // メインコンテンツ
  const MainContent = () => (
    <div className={`min-h-screen ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
      <Header />
      <main className="bg-gray-100 min-h-screen">
        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-gray-600">読み込み中...</div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-red-600">{error}</div>
          </div>
        ) : (
          <>
            {activeSection === 'dashboard' && <DashboardContent />}
            {activeSection === 'courses' && <CoursesContent />}
            {activeSection === 'users' && <UsersContent />}
            {activeSection === 'analytics' && <AnalyticsContent />}
            {activeSection === 'settings' && <SettingsContent />}
          </>
        )}
      </main>
    </div>
  );

  return (
    <div className="flex">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default AdminDashboard; 