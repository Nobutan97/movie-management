{\rtf1\ansi\ansicpg932\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import React, \{ useState, useEffect \} from 'react';\
import \{ \
  Home, \
  Film, \
  Users, \
  BarChart2, \
  Settings, \
  LogOut, \
  Plus, \
  Edit, \
  Trash2, \
  Eye, \
  Clock, \
  Search,\
  Bell,\
  User,\
  ChevronDown,\
  ChevronRight,\
  Calendar,\
  HelpCircle,\
  Monitor,\
  Smartphone,\
  Tablet,\
  Award,\
  DollarSign,\
  BookOpen,\
  Book,\
  X,\
  Save\
\} from 'lucide-react';\
\
const AdminDashboard = () => \{\
  const [activeSection, setActiveSection] = useState('dashboard');\
  const [sidebarOpen, setSidebarOpen] = useState(true);\
  const [loading, setLoading] = useState(true);\
  const [userData, setUserData] = useState(null);\
  const [statistics, setStatistics] = useState(null);\
  const [recentActivities, setRecentActivities] = useState([]);\
  const [courses, setCourses] = useState([]);\
  const [users, setUsers] = useState([]);\
  const [notifications, setNotifications] = useState([]);\
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);\
  \
  // \uc0\u12514 \u12483 \u12463 \u31649 \u29702 \u32773 \u12487 \u12540 \u12479 \
  useEffect(() => \{\
    const mockUser = \{\
      id: 1,\
      name: '\uc0\u23665 \u30000 \u22826 \u37070 ',\
      email: 'admin@example.com',\
      role: '\uc0\u31649 \u29702 \u32773 ',\
      avatar: null\
    \};\
    \
    const mockStatistics = \{\
      totalUsers: 1456,\
      activeUsers: 843,\
      totalCourses: 48,\
      publishedCourses: 42,\
      totalVideos: 642,\
      totalWatchTime: 4328760, // \uc0\u31186 \
      completionRate: 68,\
      deviceDistribution: \{\
        desktop: 64,\
        mobile: 28,\
        tablet: 8\
      \},\
      monthlyActivities: [\
        \{ month: '1\uc0\u26376 ', users: 780, watchTime: 240000 \},\
        \{ month: '2\uc0\u26376 ', users: 840, watchTime: 262000 \},\
        \{ month: '3\uc0\u26376 ', users: 920, watchTime: 286000 \},\
        \{ month: '4\uc0\u26376 ', users: 1050, watchTime: 310000 \},\
        \{ month: '5\uc0\u26376 ', users: 1150, watchTime: 342000 \},\
        \{ month: '6\uc0\u26376 ', users: 1240, watchTime: 386000 \}\
      ]\
    \};\
    \
    const mockRecentActivities = [\
      \{ id: 1, type: 'user_registration', user: '\uc0\u20304 \u12293 \u26408  \u30452 \u23376 ', timestamp: '2025-04-05T08:12:34' \},\
      \{ id: 2, type: 'course_completion', user: '\uc0\u37428 \u26408  \u20581 \u22826 ', course: 'JavaScript\u22522 \u30990 ', timestamp: '2025-04-05T07:45:22' \},\
      \{ id: 3, type: 'course_creation', user: '\uc0\u30000 \u20013  \u35488 ', course: 'React Hooks\u20837 \u38272 ', timestamp: '2025-04-04T16:32:11' \},\
      \{ id: 4, type: 'video_addition', user: '\uc0\u39640 \u27211  \u12373 \u12362 \u12426 ', course: 'Node.js\u23455 \u36341 ', video: 'Express.js\u12398 \u22522 \u26412 ', timestamp: '2025-04-04T15:18:45' \},\
      \{ id: 5, type: 'user_registration', user: '\uc0\u21152 \u34276  \u32724 \u22826 ', timestamp: '2025-04-04T11:03:21' \}\
    ];\
    \
    const mockCourses = [\
      \{ id: 1, title: 'JavaScript\uc0\u22522 \u30990 ', videos: 24, enrollments: 342, totalWatchTime: 1284600, publishedAt: '2024-12-10', status: 'published' \},\
      \{ id: 2, title: 'React\uc0\u20837 \u38272 ', videos: 18, enrollments: 276, totalWatchTime: 964800, publishedAt: '2025-01-15', status: 'published' \},\
      \{ id: 3, title: 'Node.js\uc0\u23455 \u36341 ', videos: 21, enrollments: 184, totalWatchTime: 748200, publishedAt: '2025-02-20', status: 'published' \},\
      \{ id: 4, title: 'TypeScript\uc0\u20837 \u38272 ', videos: 16, enrollments: 156, totalWatchTime: 586400, publishedAt: '2025-03-05', status: 'published' \},\
      \{ id: 5, title: 'React Hooks\uc0\u20837 \u38272 ', videos: 12, enrollments: 0, totalWatchTime: 0, publishedAt: null, status: 'draft' \}\
    ];\
    \
    const mockUsers = [\
      \{ id: 1, name: '\uc0\u23665 \u30000  \u22826 \u37070 ', email: 'yamada@example.com', enrolledCourses: 4, completedCourses: 3, totalWatchTime: 68400, lastActive: '2025-04-05T09:32:12', status: 'active' \},\
      \{ id: 2, name: '\uc0\u37428 \u26408  \u20581 \u22826 ', email: 'suzuki@example.com', enrolledCourses: 3, completedCourses: 2, totalWatchTime: 54200, lastActive: '2025-04-04T18:45:33', status: 'active' \},\
      \{ id: 3, name: '\uc0\u20304 \u34276  \u32654 \u21682 ', email: 'sato@example.com', enrolledCourses: 2, completedCourses: 1, totalWatchTime: 42600, lastActive: '2025-04-03T14:22:18', status: 'active' \},\
      \{ id: 4, name: '\uc0\u39640 \u27211  \u12373 \u12362 \u12426 ', email: 'takahashi@example.com', enrolledCourses: 5, completedCourses: 4, totalWatchTime: 82800, lastActive: '2025-04-05T11:13:42', status: 'active' \},\
      \{ id: 5, name: '\uc0\u30000 \u20013  \u35488 ', email: 'tanaka@example.com', enrolledCourses: 1, completedCourses: 0, totalWatchTime: 14400, lastActive: '2025-04-02T10:05:21', status: 'inactive' \}\
    ];\
    \
    const mockNotifications = [\
      \{ id: 1, type: 'info', message: '5\uc0\u21517 \u12398 \u26032 \u35215 \u12518 \u12540 \u12470 \u12540 \u12364 \u30331 \u37682 \u12375 \u12414 \u12375 \u12383 ', timestamp: '2025-04-05T08:30:12', read: false \},\
      \{ id: 2, type: 'success', message: '\uc0\u12496 \u12483 \u12463 \u12450 \u12483 \u12503 \u12364 \u27491 \u24120 \u12395 \u23436 \u20102 \u12375 \u12414 \u12375 \u12383 ', timestamp: '2025-04-04T23:00:05', read: true \},\
      \{ id: 3, type: 'warning', message: '\uc0\u12471 \u12473 \u12486 \u12512 \u12398 \u21033 \u29992 \u29575 \u12364 \u39640 \u12367 \u12394 \u12387 \u12390 \u12356 \u12414 \u12377 ', timestamp: '2025-04-04T16:42:33', read: false \},\
      \{ id: 4, type: 'info', message: '\uc0\u26032 \u12375 \u12356 \u12467 \u12540 \u12473 \u12300 React Hooks\u20837 \u38272 \u12301 \u12364 \u20316 \u25104 \u12373 \u12428 \u12414 \u12375 \u12383 ', timestamp: '2025-04-04T14:20:11', read: true \}\
    ];\
    \
    setUserData(mockUser);\
    setStatistics(mockStatistics);\
    setRecentActivities(mockRecentActivities);\
    setCourses(mockCourses);\
    setUsers(mockUsers);\
    setNotifications(mockNotifications);\
    setLoading(false);\
  \}, []);\
  \
  // \uc0\u26178 \u38291 \u12398 \u12501 \u12457 \u12540 \u12510 \u12483 \u12488 \u65288 \u31186 \u8594 \u26178 \u38291 :\u20998 :\u31186 \u65289 \
  const formatTime = (seconds) => \{\
    const hours = Math.floor(seconds / 3600);\
    const minutes = Math.floor((seconds % 3600) / 60);\
    \
    if (hours > 0) \{\
      return `$\{hours\}\uc0\u26178 \u38291 $\{minutes\}\u20998 `;\
    \} else \{\
      return `$\{minutes\}\uc0\u20998 `;\
    \}\
  \};\
  \
  // \uc0\u26085 \u20184 \u12398 \u12501 \u12457 \u12540 \u12510 \u12483 \u12488 \
  const formatDate = (dateString) => \{\
    if (!dateString) return '-';\
    const date = new Date(dateString);\
    return date.toLocaleString('ja-JP', \{\
      year: 'numeric',\
      month: '2-digit',\
      day: '2-digit',\
      hour: '2-digit',\
      minute: '2-digit'\
    \});\
  \};\
  \
  // \uc0\u26085 \u20184 \u12398 \u12415 \u12398 \u12501 \u12457 \u12540 \u12510 \u12483 \u12488 \
  const formatDateOnly = (dateString) => \{\
    if (!dateString) return '-';\
    const date = new Date(dateString);\
    return date.toLocaleDateString('ja-JP', \{\
      year: 'numeric',\
      month: '2-digit',\
      day: '2-digit'\
    \});\
  \};\
  \
  // \uc0\u26410 \u35501 \u36890 \u30693 \u12398 \u25968 \
  const unreadNotifications = notifications.filter(notification => !notification.read).length;\
  \
  // \uc0\u12469 \u12452 \u12489 \u12496 \u12540 \
  const Sidebar = () => (\
    <div className=\{`bg-gray-900 text-white h-screen flex flex-col $\{sidebarOpen ? 'w-64' : 'w-20'\} transition-all duration-300 fixed`\}>\
      <div className="p-4 border-b border-gray-700 flex items-center">\
        \{sidebarOpen ? (\
          <h1 className="text-xl font-bold">\uc0\u31649 \u29702 \u12497 \u12493 \u12523 </h1>\
        ) : (\
          <Film size=\{24\} />\
        )\}\
      </div>\
      \
      <nav className="flex-1 p-4 overflow-y-auto">\
        <ul className="space-y-2">\
          <SidebarItem\
            icon=\{<Home size=\{20\} />\}\
            text="\uc0\u12480 \u12483 \u12471 \u12517 \u12508 \u12540 \u12489 "\
            active=\{activeSection === 'dashboard'\}\
            onClick=\{() => setActiveSection('dashboard')\}\
            collapsed=\{!sidebarOpen\}\
          />\
          <SidebarItem\
            icon=\{<Film size=\{20\} />\}\
            text="\uc0\u12467 \u12540 \u12473 \u31649 \u29702 "\
            active=\{activeSection === 'courses'\}\
            onClick=\{() => setActiveSection('courses')\}\
            collapsed=\{!sidebarOpen\}\
          />\
          <SidebarItem\
            icon=\{<Users size=\{20\} />\}\
            text="\uc0\u12518 \u12540 \u12470 \u12540 \u31649 \u29702 "\
            active=\{activeSection === 'users'\}\
            onClick=\{() => setActiveSection('users')\}\
            collapsed=\{!sidebarOpen\}\
          />\
          <SidebarItem\
            icon=\{<BarChart2 size=\{20\} />\}\
            text="\uc0\u32113 \u35336 \u12539 \u20998 \u26512 "\
            active=\{activeSection === 'analytics'\}\
            onClick=\{() => setActiveSection('analytics')\}\
            collapsed=\{!sidebarOpen\}\
          />\
          <SidebarItem\
            icon=\{<Settings size=\{20\} />\}\
            text="\uc0\u35373 \u23450 "\
            active=\{activeSection === 'settings'\}\
            onClick=\{() => setActiveSection('settings')\}\
            collapsed=\{!sidebarOpen\}\
          />\
        </ul>\
      </nav>\
      \
      <div className="p-4 border-t border-gray-700">\
        <button\
          className="flex items-center text-gray-400 hover:text-white transition-colors w-full"\
        >\
          <LogOut size=\{20\} className="shrink-0" />\
          \{sidebarOpen && <span className="ml-2">\uc0\u12525 \u12464 \u12450 \u12454 \u12488 </span>\}\
        </button>\
      </div>\
    </div>\
  );\
const SidebarItem = (\{ icon, text, active, onClick, collapsed \}) => (\
    <li>\
      <button\
        className=\{`flex items-center w-full p-2 rounded-md transition-colors $\{\
          active ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'\
        \}`\}\
        onClick=\{onClick\}\
      >\
        <span className="shrink-0">\{icon\}</span>\
        \{!collapsed && <span className="ml-3">\{text\}</span>\}\
      </button>\
    </li>\
  );\
  \
  // \uc0\u12504 \u12483 \u12480 \u12540 \
  const Header = () => (\
    <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center sticky top-0 z-10">\
      <div className="flex items-center">\
        <button\
          className="text-gray-500 hover:text-gray-700 focus:outline-none mr-4"\
          onClick=\{() => setSidebarOpen(!sidebarOpen)\}\
        >\
          \{sidebarOpen ? <ChevronRight size=\{24\} /> : <ChevronRight size=\{24\} className="transform rotate-180" />\}\
        </button>\
        \
        <h1 className="text-xl font-semibold text-gray-800">\
          \{activeSection === 'dashboard' && '\uc0\u12480 \u12483 \u12471 \u12517 \u12508 \u12540 \u12489 '\}\
          \{activeSection === 'courses' && '\uc0\u12467 \u12540 \u12473 \u31649 \u29702 '\}\
          \{activeSection === 'users' && '\uc0\u12518 \u12540 \u12470 \u12540 \u31649 \u29702 '\}\
          \{activeSection === 'analytics' && '\uc0\u32113 \u35336 \u12539 \u20998 \u26512 '\}\
          \{activeSection === 'settings' && '\uc0\u12471 \u12473 \u12486 \u12512 \u35373 \u23450 '\}\
        </h1>\
      </div>\
      \
      <div className="flex items-center space-x-4">\
        <div className="relative">\
          <button className="text-gray-600 hover:text-gray-900 focus:outline-none">\
            <Bell size=\{20\} />\
            \{unreadNotifications > 0 && (\
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">\
                \{unreadNotifications\}\
              </span>\
            )\}\
          </button>\
        </div>\
        \
        <div className="flex items-center">\
          <div className="flex items-center mr-2">\
            \{userData?.avatar ? (\
              <img\
                src=\{userData.avatar\}\
                alt=\{userData.name\}\
                className="w-8 h-8 rounded-full"\
              />\
            ) : (\
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">\
                \{userData?.name.charAt(0)\}\
              </div>\
            )\}\
          </div>\
          <div className="text-sm hidden md:block">\
            <p className="font-medium text-gray-800">\{userData?.name\}</p>\
            <p className="text-gray-500">\{userData?.role\}</p>\
          </div>\
        </div>\
      </div>\
    </header>\
  );\
  \
  // \uc0\u12480 \u12483 \u12471 \u12517 \u12508 \u12540 \u12489 \
  const DashboardSection = () => (\
    <div className="p-6">\
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">\
        <StatCard \
          title="\uc0\u30331 \u37682 \u12518 \u12540 \u12470 \u12540 " \
          value=\{statistics?.totalUsers\}\
          subValue=\{`\uc0\u12450 \u12463 \u12486 \u12451 \u12502 : $\{statistics?.activeUsers\}\u20154 `\}\
          icon=\{<Users className="text-blue-500" size=\{24\} />\} \
        />\
        <StatCard \
          title="\uc0\u12467 \u12540 \u12473 \u25968 " \
          value=\{statistics?.totalCourses\}\
          subValue=\{`\uc0\u20844 \u38283 \u28168 \u12415 : $\{statistics?.publishedCourses\}\u12467 \u12540 \u12473 `\}\
          icon=\{<BookOpen className="text-green-500" size=\{24\} />\} \
        />\
        <StatCard \
          title="\uc0\u21512 \u35336 \u35222 \u32884 \u26178 \u38291 " \
          value=\{formatTime(statistics?.totalWatchTime)\}\
          subValue="\uc0\u20808 \u26376 \u27604  +12%"\
          icon=\{<Clock className="text-purple-500" size=\{24\} />\} \
        />\
        <StatCard \
          title="\uc0\u12467 \u12540 \u12473 \u23436 \u20102 \u29575 " \
          value=\{`$\{statistics?.completionRate\}%`\}\
          subValue="\uc0\u20808 \u26376 \u27604  +5%"\
          icon=\{<Award className="text-orange-500" size=\{24\} />\} \
        />\
      </div>\
      \
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">\
        <div className="lg:col-span-2">\
          <div className="bg-white rounded-lg shadow p-6">\
            <div className="flex justify-between items-center mb-6">\
              <h2 className="text-lg font-bold">\uc0\u26376 \u38291 \u12450 \u12463 \u12486 \u12451 \u12499 \u12486 \u12451 </h2>\
              <select className="border border-gray-300 rounded-md text-sm p-1">\
                <option>\uc0\u36942 \u21435 6\u12534 \u26376 </option>\
                <option>\uc0\u36942 \u21435 12\u12534 \u26376 </option>\
                <option>\uc0\u20170 \u24180 </option>\
              </select>\
            </div>\
            \
            <div className="h-80 flex items-end justify-between space-x-2">\
              \{statistics?.monthlyActivities.map((data, index) => (\
                <div key=\{index\} className="flex flex-col items-center flex-1">\
                  <div className="w-full flex justify-center space-x-1">\
                    <div \
                      className="bg-blue-500 w-5 rounded-t-sm" \
                      style=\{\{ \
                        height: `$\{(data.users / statistics.totalUsers) * 150\}px` \
                      \}\}\
                    ></div>\
                    <div \
                      className="bg-green-500 w-5 rounded-t-sm" \
                      style=\{\{ \
                        height: `$\{(data.watchTime / statistics.totalWatchTime) * 150\}px` \
                      \}\}\
                    ></div>\
                  </div>\
                  <div className="text-xs mt-2 text-gray-600">\
                    \{data.month\}\
                  </div>\
                </div>\
              ))\}\
            </div>\
            <div className="flex justify-center mt-4">\
              <div className="flex items-center mr-4">\
                <div className="w-3 h-3 bg-blue-500 mr-1"></div>\
                <span className="text-xs text-gray-600">\uc0\u12518 \u12540 \u12470 \u12540 \u25968 </span>\
              </div>\
              <div className="flex items-center">\
                <div className="w-3 h-3 bg-green-500 mr-1"></div>\
                <span className="text-xs text-gray-600">\uc0\u35222 \u32884 \u26178 \u38291 </span>\
              </div>\
            </div>\
          </div>\
        </div>\
        \
        <div className="bg-white rounded-lg shadow p-6">\
          <h2 className="text-lg font-bold mb-6">\uc0\u12487 \u12496 \u12452 \u12473 \u20998 \u24067 </h2>\
          <div className="space-y-6">\
            <DeviceStatItem \
              icon=\{<Monitor size=\{20\} />\}\
              label="\uc0\u12487 \u12473 \u12463 \u12488 \u12483 \u12503 "\
              value=\{statistics?.deviceDistribution.desktop\}\
            />\
            <DeviceStatItem \
              icon=\{<Smartphone size=\{20\} />\}\
              label="\uc0\u12514 \u12496 \u12452 \u12523 "\
              value=\{statistics?.deviceDistribution.mobile\}\
            />\
            <DeviceStatItem \
              icon=\{<Tablet size=\{20\} />\}\
              label="\uc0\u12479 \u12502 \u12524 \u12483 \u12488 "\
              value=\{statistics?.deviceDistribution.tablet\}\
            />\
          </div>\
        </div>\
      </div>\
      \
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">\
        <div className="lg:col-span-2 bg-white rounded-lg shadow">\
          <div className="p-6 border-b border-gray-200">\
            <h2 className="text-lg font-bold">\uc0\u26368 \u36817 \u12398 \u12467 \u12540 \u12473 </h2>\
          </div>\
          <div className="overflow-x-auto">\
            <table className="min-w-full divide-y divide-gray-200">\
              <thead className="bg-gray-50">\
                <tr>\
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">\
                    \uc0\u12467 \u12540 \u12473 \u21517 \
                  </th>\
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">\
                    \uc0\u21205 \u30011 \u25968 \
                  </th>\
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">\
                    \uc0\u30331 \u37682 \u32773 \u25968 \
                  </th>\
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">\
                    \uc0\u20844 \u38283 \u26085 \
                  </th>\
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">\
                    \uc0\u29366 \u24907 \
                  </th>\
                </tr>\
              </thead>\
              <tbody className="bg-white divide-y divide-gray-200">\
                \{courses.slice(0, 4).map(course => (\
                  <tr key=\{course.id\} className="hover:bg-gray-50">\
                    <td className="px-6 py-4 whitespace-nowrap">\
                      <div className="text-sm font-medium text-gray-900">\{course.title\}</div>\
                    </td>\
                    <td className="px-6 py-4 whitespace-nowrap">\
                      <div className="text-sm text-gray-500">\{course.videos\}</div>\
                    </td>\
                    <td className="px-6 py-4 whitespace-nowrap">\
                      <div className="text-sm text-gray-500">\{course.enrollments\}</div>\
                    </td>\
                    <td className="px-6 py-4 whitespace-nowrap">\
                      <div className="text-sm text-gray-500">\{formatDateOnly(course.publishedAt)\}</div>\
                    </td>\
                    <td className="px-6 py-4 whitespace-nowrap">\
                      <span className=\{`px-2 inline-flex text-xs leading-5 font-semibold rounded-full \
                        $\{course.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'\}`\}>\
                        \{course.status === 'published' ? '\uc0\u20844 \u38283 \u20013 ' : '\u19979 \u26360 \u12365 '\}\
                      </span>\
                    </td>\
                  </tr>\
                ))\}\
              </tbody>\
            </table>\
          </div>\
          <div className="p-4 border-t border-gray-200">\
            <button \
              className="text-blue-500 hover:text-blue-700 flex items-center text-sm"\
              onClick=\{() => setActiveSection('courses')\}\
            >\
              \uc0\u12377 \u12409 \u12390 \u12398 \u12467 \u12540 \u12473 \u12434 \u34920 \u31034 \
              <ChevronRight size=\{16\} className="ml-1" />\
            </button>\
          </div>\
        </div>\
<div className="bg-white rounded-lg shadow">\
          <div className="p-6 border-b border-gray-200">\
            <h2 className="text-lg font-bold">\uc0\u26368 \u36817 \u12398 \u12450 \u12463 \u12486 \u12451 \u12499 \u12486 \u12451 </h2>\
          </div>\
          <div className="p-6">\
            <div className="space-y-6">\
              \{recentActivities.map(activity => (\
                <div key=\{activity.id\} className="flex">\
                  <div className="mr-4">\
                    <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">\
                      \{activity.type === 'user_registration' && <User size=\{16\} />\}\
                      \{activity.type === 'course_completion' && <Award size=\{16\} />\}\
                      \{activity.type === 'course_creation' && <Book size=\{16\} />\}\
                      \{activity.type === 'video_addition' && <Film size=\{16\} />\}\
                    </div>\
                  </div>\
                  <div>\
                    <p className="text-sm">\
                      \{activity.type === 'user_registration' && (\
                        <span><strong>\{activity.user\}</strong> \uc0\u12364 \u26032 \u35215 \u30331 \u37682 \u12375 \u12414 \u12375 \u12383 </span>\
                      )\}\
                      \{activity.type === 'course_completion' && (\
                        <span><strong>\{activity.user\}</strong> \uc0\u12364  <strong>\{activity.course\}</strong> \u12434 \u23436 \u20102 \u12375 \u12414 \u12375 \u12383 </span>\
                      )\}\
                      \{activity.type === 'course_creation' && (\
                        <span><strong>\{activity.user\}</strong> \uc0\u12364 \u26032 \u12375 \u12356 \u12467 \u12540 \u12473  <strong>\{activity.course\}</strong> \u12434 \u20316 \u25104 \u12375 \u12414 \u12375 \u12383 </span>\
                      )\}\
                      \{activity.type === 'video_addition' && (\
                        <span><strong>\{activity.user\}</strong> \uc0\u12364  <strong>\{activity.course\}</strong> \u12395 \u21205 \u30011  <strong>\{activity.video\}</strong> \u12434 \u36861 \u21152 \u12375 \u12414 \u12375 \u12383 </span>\
                      )\}\
                    </p>\
                    <p className="text-xs text-gray-500 mt-1">\{formatDate(activity.timestamp)\}</p>\
                  </div>\
                </div>\
              ))\}\
            </div>\
          </div>\
        </div>\
      </div>\
    </div>\
  );\
  \
  // \uc0\u32113 \u35336 \u12459 \u12540 \u12489 \
  const StatCard = (\{ title, value, subValue, icon \}) => (\
    <div className="bg-white rounded-lg shadow p-6 flex items-center">\
      <div className="mr-4">\
        \{icon\}\
      </div>\
      <div>\
        <h3 className="text-gray-500 text-sm">\{title\}</h3>\
        <div className="text-2xl font-bold">\{value\}</div>\
        \{subValue && <div className="text-xs text-gray-500 mt-1">\{subValue\}</div>\}\
      </div>\
    </div>\
  );\
  \
  // \uc0\u12487 \u12496 \u12452 \u12473 \u32113 \u35336 \u12450 \u12452 \u12486 \u12512 \
  const DeviceStatItem = (\{ icon, label, value \}) => (\
    <div>\
      <div className="flex justify-between items-center mb-1">\
        <div className="flex items-center">\
          <span className="text-gray-500 mr-2">\
            \{icon\}\
          </span>\
          <span className="text-sm">\{label\}</span>\
        </div>\
        <span className="text-sm font-medium">\{value\}%</span>\
      </div>\
      <div className="w-full bg-gray-200 rounded-full h-2">\
        <div \
          className="bg-blue-600 h-2 rounded-full" \
          style=\{\{ width: `$\{value\}%` \}\}\
        ></div>\
      </div>\
    </div>\
  );\
  \
  // \uc0\u12467 \u12540 \u12473 \u31649 \u29702 \u12475 \u12463 \u12471 \u12519 \u12531 \
  const CoursesSection = () => (\
    <div className="p-6">\
      \{isCreatingCourse ? (\
        <CourseForm onCancel=\{() => setIsCreatingCourse(false)\} />\
      ) : (\
        <>\
          <div className="flex justify-between items-center mb-6">\
            <h2 className="text-2xl font-bold">\uc0\u12467 \u12540 \u12473 \u31649 \u29702 </h2>\
            <button \
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"\
              onClick=\{() => setIsCreatingCourse(true)\}\
            >\
              <Plus size=\{16\} className="mr-2" />\
              \uc0\u26032 \u35215 \u12467 \u12540 \u12473 \u20316 \u25104 \
            </button>\
          </div>\
          \
          <div className="bg-white rounded-lg shadow overflow-hidden">\
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">\
              <div className="relative">\
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">\
                  <Search size=\{16\} className="text-gray-400" />\
                </div>\
                <input\
                  type="text"\
                  className="bg-white pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"\
                  placeholder="\uc0\u12467 \u12540 \u12473 \u12434 \u26908 \u32034 ..."\
                />\
              </div>\
              \
              <div>\
                <select className="border border-gray-300 rounded-md text-sm p-2">\
                  <option>\uc0\u12377 \u12409 \u12390 \u12398 \u12467 \u12540 \u12473 </option>\
                  <option>\uc0\u20844 \u38283 \u20013 </option>\
                  <option>\uc0\u19979 \u26360 \u12365 </option>\
                </select>\
              </div>\
            </div>\
            \
            <table className="min-w-full divide-y divide-gray-200">\
              <thead className="bg-gray-50">\
                <tr>\
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">\
                    \uc0\u12467 \u12540 \u12473 \u21517 \
                  </th>\
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">\
                    \uc0\u21205 \u30011 \u25968 \
                  </th>\
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">\
                    \uc0\u30331 \u37682 \u32773 \u25968 \
                  </th>\
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">\
                    \uc0\u32207 \u35222 \u32884 \u26178 \u38291 \
                  </th>\
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">\
                    \uc0\u20844 \u38283 \u26085 \
                  </th>\
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">\
                    \uc0\u29366 \u24907 \
                  </th>\
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">\
                    \uc0\u12450 \u12463 \u12471 \u12519 \u12531 \
                  </th>\
                </tr>\
              </thead>\
              <tbody className="bg-white divide-y divide-gray-200">\
                \{courses.map(course => (\
                  <tr key=\{course.id\} className="hover:bg-gray-50">\
                    <td className="px-6 py-4 whitespace-nowrap">\
                      <div className="text-sm font-medium text-gray-900">\{course.title\}</div>\
                    </td>\
                    <td className="px-6 py-4 whitespace-nowrap">\
                      <div className="text-sm text-gray-500">\{course.videos\}</div>\
                    </td>\
                    <td className="px-6 py-4 whitespace-nowrap">\
                      <div className="text-sm text-gray-500">\{course.enrollments\}</div>\
                    </td>\
                    <td className="px-6 py-4 whitespace-nowrap">\
                      <div className="text-sm text-gray-500">\{formatTime(course.totalWatchTime)\}</div>\
                    </td>\
                    <td className="px-6 py-4 whitespace-nowrap">\
                      <div className="text-sm text-gray-500">\{formatDateOnly(course.publishedAt)\}</div>\
                    </td>\
                    <td className="px-6 py-4 whitespace-nowrap">\
                      <span className=\{`px-2 inline-flex text-xs leading-5 font-semibold rounded-full \
                        $\{course.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'\}`\}>\
                        \{course.status === 'published' ? '\uc0\u20844 \u38283 \u20013 ' : '\u19979 \u26360 \u12365 '\}\
                      </span>\
                    </td>\
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">\
                      <div className="flex space-x-2">\
                        <button className="text-blue-600 hover:text-blue-800">\
                          <Eye size=\{18\} />\
                        </button>\
                        <button className="text-green-600 hover:text-green-800">\
                          <Edit size=\{18\} />\
                        </button>\
                        <button className="text-red-600 hover:text-red-800">\
                          <Trash2 size=\{18\} />\
                        </button>\
                      </div>\
                    </td>\
                  </tr>\
                ))\}\
              </tbody>\
            </table>\
            \
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex items-center justify-between">\
              <div className="text-sm text-gray-700">\
                \uc0\u20840  <span className="font-medium">\{courses.length\}</span> \u12467 \u12540 \u12473 \
              </div>\
              \
              <div className="flex space-x-2">\
                <button className="px-2 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50">\uc0\u21069 \u12408 </button>\
                <button className="px-2 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50">\uc0\u27425 \u12408 </button>\
              </div>\
            </div>\
          </div>\
        </>\
      )\}\
    </div>\
  );\
// \uc0\u12467 \u12540 \u12473 \u20316 \u25104 \u12501 \u12457 \u12540 \u12512 \
  const CourseForm = (\{ onCancel \}) => (\
    <div className="bg-white rounded-lg shadow p-6">\
      <div className="flex justify-between items-center mb-6">\
        <h2 className="text-xl font-bold">\uc0\u26032 \u35215 \u12467 \u12540 \u12473 \u20316 \u25104 </h2>\
        <button\
          className="text-gray-500 hover:text-gray-700"\
          onClick=\{onCancel\}\
        >\
          <X size=\{20\} />\
        </button>\
      </div>\
      \
      <form>\
        <div className="space-y-6">\
          <div>\
            <label className="block text-sm font-medium text-gray-700 mb-1">\
              \uc0\u12467 \u12540 \u12473 \u12479 \u12452 \u12488 \u12523 *\
            </label>\
            <input\
              type="text"\
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"\
              placeholder="\uc0\u20363 : JavaScript\u22522 \u30990 \u12510 \u12473 \u12479 \u12540 "\
              required\
            />\
          </div>\
          \
          <div>\
            <label className="block text-sm font-medium text-gray-700 mb-1">\
              \uc0\u12467 \u12540 \u12473 \u35500 \u26126 *\
            </label>\
            <textarea\
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"\
              rows=\{4\}\
              placeholder="\uc0\u12467 \u12540 \u12473 \u12398 \u27010 \u35201 \u12392 \u23398 \u32722 \u30446 \u27161 \u12434 \u35352 \u20837 \u12375 \u12390 \u12367 \u12384 \u12373 \u12356 "\
              required\
            ></textarea>\
          </div>\
          \
          <div>\
            <label className="block text-sm font-medium text-gray-700 mb-1">\
              \uc0\u12459 \u12486 \u12468 \u12522 \
            </label>\
            <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">\
              <option>\uc0\u12503 \u12525 \u12464 \u12521 \u12511 \u12531 \u12464 </option>\
              <option>\uc0\u12487 \u12470 \u12452 \u12531 </option>\
              <option>\uc0\u12499 \u12472 \u12493 \u12473 </option>\
              <option>\uc0\u12510 \u12540 \u12465 \u12486 \u12451 \u12531 \u12464 </option>\
              <option>\uc0\u12381 \u12398 \u20182 </option>\
            </select>\
          </div>\
          \
          <div>\
            <label className="block text-sm font-medium text-gray-700 mb-1">\
              \uc0\u38627 \u26131 \u24230 \
            </label>\
            <div className="flex space-x-4">\
              <label className="flex items-center">\
                <input\
                  type="radio"\
                  name="difficulty"\
                  className="h-4 w-4 text-blue-600 border-gray-300"\
                  defaultChecked\
                />\
                <span className="ml-2 text-sm text-gray-700">\uc0\u21021 \u32026 </span>\
              </label>\
              <label className="flex items-center">\
                <input\
                  type="radio"\
                  name="difficulty"\
                  className="h-4 w-4 text-blue-600 border-gray-300"\
                />\
                <span className="ml-2 text-sm text-gray-700">\uc0\u20013 \u32026 </span>\
              </label>\
              <label className="flex items-center">\
                <input\
                  type="radio"\
                  name="difficulty"\
                  className="h-4 w-4 text-blue-600 border-gray-300"\
                />\
                <span className="ml-2 text-sm text-gray-700">\uc0\u19978 \u32026 </span>\
              </label>\
            </div>\
          </div>\
          \
          <div className="flex items-center">\
            <input\
              type="checkbox"\
              id="publish"\
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"\
            />\
            <label htmlFor="publish" className="ml-2 block text-sm text-gray-900">\
              \uc0\u20316 \u25104 \u24460 \u12377 \u12368 \u12395 \u20844 \u38283 \u12377 \u12427 \
            </label>\
          </div>\
          \
          <div className="flex justify-end space-x-2 pt-4">\
            <button\
              type="button"\
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"\
              onClick=\{onCancel\}\
            >\
              \uc0\u12461 \u12515 \u12531 \u12475 \u12523 \
            </button>\
            <button\
              type="submit"\
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"\
            >\
              <Save size=\{16\} className="mr-2" />\
              \uc0\u20316 \u25104 \u12377 \u12427 \
            </button>\
          </div>\
        </div>\
      </form>\
    </div>\
  );\
  \
  // \uc0\u12518 \u12540 \u12470 \u12540 \u31649 \u29702 \u12475 \u12463 \u12471 \u12519 \u12531 \
  const UsersSection = () => (\
    <div className="p-6">\
      <div className="flex justify-between items-center mb-6">\
        <h2 className="text-2xl font-bold">\uc0\u12518 \u12540 \u12470 \u12540 \u31649 \u29702 </h2>\
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">\
          <Plus size=\{16\} className="mr-2" />\
          \uc0\u12518 \u12540 \u12470 \u12540 \u36861 \u21152 \
        </button>\
      </div>\
      \
      <div className="bg-white rounded-lg shadow overflow-hidden">\
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">\
          <div className="relative">\
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">\
              <Search size=\{16\} className="text-gray-400" />\
            </div>\
            <input\
              type="text"\
              className="bg-white pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"\
              placeholder="\uc0\u12518 \u12540 \u12470 \u12540 \u12434 \u26908 \u32034 ..."\
            />\
          </div>\
          \
          <div>\
            <select className="border border-gray-300 rounded-md text-sm p-2">\
              <option>\uc0\u12377 \u12409 \u12390 \u12398 \u12518 \u12540 \u12470 \u12540 </option>\
              <option>\uc0\u12450 \u12463 \u12486 \u12451 \u12502 </option>\
              <option>\uc0\u38750 \u12450 \u12463 \u12486 \u12451 \u12502 </option>\
            </select>\
          </div>\
        </div>\
        \
        <table className="min-w-full divide-y divide-gray-200">\
          <thead className="bg-gray-50">\
            <tr>\
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">\
                \uc0\u12518 \u12540 \u12470 \u12540 \
              </th>\
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">\
                \uc0\u30331 \u37682 \u12467 \u12540 \u12473 \u25968 \
              </th>\
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">\
                \uc0\u23436 \u20102 \u12467 \u12540 \u12473 \u25968 \
              </th>\
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">\
                \uc0\u32207 \u35222 \u32884 \u26178 \u38291 \
              </th>\
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">\
                \uc0\u26368 \u32066 \u12450 \u12463 \u12486 \u12451 \u12502 \
              </th>\
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">\
                \uc0\u29366 \u24907 \
              </th>\
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">\
                \uc0\u12450 \u12463 \u12471 \u12519 \u12531 \
              </th>\
            </tr>\
          </thead>\
          <tbody className="bg-white divide-y divide-gray-200">\
            \{users.map(user => (\
              <tr key=\{user.id\} className="hover:bg-gray-50">\
                <td className="px-6 py-4 whitespace-nowrap">\
                  <div className="flex items-center">\
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">\
                      \{user.name.charAt(0)\}\
                    </div>\
                    <div className="ml-4">\
                      <div className="text-sm font-medium text-gray-900">\{user.name\}</div>\
                      <div className="text-sm text-gray-500">\{user.email\}</div>\
                    </div>\
                  </div>\
                </td>\
                <td className="px-6 py-4 whitespace-nowrap">\
                  <div className="text-sm text-gray-500">\{user.enrolledCourses\}</div>\
                </td>\
                <td className="px-6 py-4 whitespace-nowrap">\
                  <div className="text-sm text-gray-500">\{user.completedCourses\}</div>\
                </td>\
                <td className="px-6 py-4 whitespace-nowrap">\
                  <div className="text-sm text-gray-500">\{formatTime(user.totalWatchTime)\}</div>\
                </td>\
                <td className="px-6 py-4 whitespace-nowrap">\
                  <div className="text-sm text-gray-500">\{formatDate(user.lastActive)\}</div>\
                </td>\
                <td className="px-6 py-4 whitespace-nowrap">\
                  <span className=\{`px-2 inline-flex text-xs leading-5 font-semibold rounded-full \
                    $\{user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'\}`\}>\
                    \{user.status === 'active' ? '\uc0\u12450 \u12463 \u12486 \u12451 \u12502 ' : '\u38750 \u12450 \u12463 \u12486 \u12451 \u12502 '\}\
                  </span>\
                </td>\
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">\
                  <div className="flex space-x-2">\
                    <button className="text-blue-600 hover:text-blue-800">\
                      <Eye size=\{18\} />\
                    </button>\
                    <button className="text-green-600 hover:text-green-800">\
                      <Edit size=\{18\} />\
                    </button>\
                    <button className="text-red-600 hover:text-red-800">\
                      <Trash2 size=\{18\} />\
                    </button>\
                  </div>\
                </td>\
              </tr>\
            ))\}\
          </tbody>\
        </table>\
        \
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex items-center justify-between">\
          <div className="text-sm text-gray-700">\
            \uc0\u20840  <span className="font-medium">\{users.length\}</span> \u12518 \u12540 \u12470 \u12540 \
          </div>\
          \
          <div className="flex space-x-2">\
            <button className="px-2 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50">\uc0\u21069 \u12408 </button>\
            <button className="px-2 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50">\uc0\u27425 \u12408 </button>\
          </div>\
        </div>\
      </div>\
    </div>\
  );\
  \
  // \uc0\u32113 \u35336 \u12539 \u20998 \u26512 \u12475 \u12463 \u12471 \u12519 \u12531 \
  const AnalyticsSection = () => (\
    <div className="p-6">\
      <h2 className="text-2xl font-bold mb-6">\uc0\u32113 \u35336 \u12539 \u20998 \u26512 </h2>\
      \
      <div className="mb-6">\
        <div className="bg-white rounded-lg shadow p-6">\
          <div className="flex justify-between items-center mb-6">\
            <h3 className="text-lg font-bold">\uc0\u26399 \u38291 \u12434 \u36984 \u25246 </h3>\
            <div className="flex space-x-4">\
              <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm">\uc0\u36913 \u38291 </button>\
              <button className="text-gray-700 px-3 py-1 rounded-md text-sm">\uc0\u26376 \u38291 </button>\
              <button className="text-gray-700 px-3 py-1 rounded-md text-sm">\uc0\u24180 \u38291 </button>\
              <div className="relative flex items-center">\
                <input\
                  type="date"\
                  className="p-1 text-sm border border-gray-300 rounded-md"\
                />\
                <span className="mx-2">\uc0\u65374 </span>\
                <input\
                  type="date"\
                  className="p-1 text-sm border border-gray-300 rounded-md"\
                />\
              </div>\
            </div>\
          </div>\
          \
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">\
            <StatCard \
              title="\uc0\u26032 \u35215 \u12518 \u12540 \u12470 \u12540 " \
              value="124"\
              subValue="\uc0\u20808 \u36913 \u27604  +12%"\
              icon=\{<Users className="text-blue-500" size=\{24\} />\} \
            />\
            <StatCard \
              title="\uc0\u12467 \u12540 \u12473 \u30331 \u37682 \u25968 " \
              value="356"\
              subValue="\uc0\u20808 \u36913 \u27604  +8%"\
              icon=\{<BookOpen className="text-green-500" size=\{24\} />\} \
            />\
            <StatCard \
              title="\uc0\u12467 \u12540 \u12473 \u23436 \u20102 \u25968 " \
              value="98"\
              subValue="\uc0\u20808 \u36913 \u27604  +15%"\
              icon=\{<Award className="text-purple-500" size=\{24\} />\} \
            />\
            <StatCard \
              title="\uc0\u32207 \u21454 \u30410 " \
              value="\'a51,245,600"\
              subValue="\uc0\u20808 \u36913 \u27604  +5%"\
              icon=\{<DollarSign className="text-orange-500" size=\{24\} />\} \
            />\
          </div>\
          \
          <div className="h-80 flex items-end justify-between space-x-2">\
            \{['\uc0\u26376 ', '\u28779 ', '\u27700 ', '\u26408 ', '\u37329 ', '\u22303 ', '\u26085 '].map((day, index) => (\
              <div key=\{index\} className="flex flex-col items-center flex-1">\
                <div className="w-full flex justify-center space-x-1">\
                  <div \
                    className="bg-blue-500 w-5 rounded-t-sm" \
                    style=\{\{ \
                      height: `$\{Math.floor(Math.random() * 100) + 50\}px` \
                    \}\}\
                  ></div>\
                  <div \
                    className="bg-green-500 w-5 rounded-t-sm" \
                    style=\{\{ \
                      height: `$\{Math.floor(Math.random() * 100) + 30\}px` \
                    \}\}\
                  ></div>\
                </div>\
                <div className="text-xs mt-2 text-gray-600">\
                  \{day\}\
                </div>\
              </div>\
            ))\}\
          </div>\
          <div className="flex justify-center mt-4">\
            <div className="flex items-center mr-4">\
              <div className="w-3 h-3 bg-blue-500 mr-1"></div>\
              <span className="text-xs text-gray-600">\uc0\u35222 \u32884 \u25968 </span>\
            </div>\
            <div className="flex items-center">\
              <div className="w-3 h-3 bg-green-500 mr-1"></div>\
              <span className="text-xs text-gray-600">\uc0\u12467 \u12540 \u12473 \u23436 \u20102 \u25968 </span>\
            </div>\
          </div>\
        </div>\
      </div>\
      \
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">\
        <div className="bg-white rounded-lg shadow p-6">\
          <h3 className="text-lg font-bold mb-6">\uc0\u20154 \u27671 \u12467 \u12540 \u12473 </h3>\
          <div className="space-y-4">\
            \{courses.slice(0, 4).map((course, index) => (\
              <div key=\{course.id\} className="flex items-center">\
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs mr-4">\
                  \{index + 1\}\
                </div>\
                <div className="flex-1">\
                  <div className="flex justify-between items-center mb-1">\
                    <div className="text-sm font-medium">\{course.title\}</div>\
                    <div className="text-xs text-gray-500">\{course.enrollments\} \uc0\u30331 \u37682 </div>\
                  </div>\
                  <div className="w-full bg-gray-200 rounded-full h-1.5">\
                    <div \
                      className="bg-blue-600 h-1.5 rounded-full" \
                      style=\{\{ width: `$\{Math.min(100, (course.enrollments / 400) * 100)\}%` \}\}\
                    ></div>\
                  </div>\
                </div>\
              </div>\
            ))\}\
          </div>\
        </div>\
        \
        <div className="bg-white rounded-lg shadow p-6">\
          <h3 className="text-lg font-bold mb-6">\uc0\u12450 \u12463 \u12486 \u12451 \u12502 \u12518 \u12540 \u12470 \u12540 </h3>\
          <div className="space-y-4">\
            \{users.slice(0, 4).map((user, index) => (\
              <div key=\{user.id\} className="flex items-center">\
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">\
                  \{user.name.charAt(0)\}\
                </div>\
                <div className="flex-1">\
                  <div className="flex justify-between items-center mb-1">\
                    <div className="text-sm font-medium">\{user.name\}</div>\
                    <div className="text-xs text-gray-500">\{formatTime(user.totalWatchTime)\}</div>\
                  </div>\
                  <div className="flex justify-between text-xs">\
                    <div>\{user.completedCourses\}/\{user.enrolledCourses\} \uc0\u12467 \u12540 \u12473 \u23436 \u20102 </div>\
                    <div>\uc0\u26368 \u32066 \u12450 \u12463 \u12486 \u12451 \u12502 : \{formatDateOnly(user.lastActive)\}</div>\
                  </div>\
                </div>\
              </div>\
            ))\}\
          </div>\
        </div>\
      </div>\
      \
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">\
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">\
          <h3 className="text-lg font-bold mb-6">\uc0\u26178 \u38291 \u24111 \u21029 \u12450 \u12463 \u12486 \u12451 \u12499 \u12486 \u12451 </h3>\
          <div className="h-60 flex items-end justify-between">\
            \{[0, 3, 6, 9, 12, 15, 18, 21].map((hour, index) => (\
              <div key=\{index\} className="flex flex-col items-center flex-1">\
                <div \
                  className="bg-blue-500 w-12 rounded-t-md"\
                  style=\{\{ height: `$\{Math.floor(Math.random() * 120) + 30\}px` \}\}\
                ></div>\
                <div className="text-xs mt-2 text-gray-600">\
                  \{hour\}:00\
                </div>\
              </div>\
            ))\}\
          </div>\
        </div>\
        \
        <div className="bg-white rounded-lg shadow p-6">\
          <h3 className="text-lg font-bold mb-6">\uc0\u12459 \u12486 \u12468 \u12522 \u20998 \u24067 </h3>\
          <div className="space-y-4">\
            \{[\
              \{ name: '\uc0\u12503 \u12525 \u12464 \u12521 \u12511 \u12531 \u12464 ', value: 42 \},\
              \{ name: '\uc0\u12487 \u12470 \u12452 \u12531 ', value: 28 \},\
              \{ name: '\uc0\u12499 \u12472 \u12493 \u12473 ', value: 18 \},\
              \{ name: '\uc0\u12510 \u12540 \u12465 \u12486 \u12451 \u12531 \u12464 ', value: 12 \}\
            ].map((category, index) => (\
              <div key=\{index\}>\
                <div className="flex justify-between text-sm mb-1">\
                  <span>\{category.name\}</span>\
                  <span>\{category.value\}%</span>\
                </div>\
                <div className="w-full bg-gray-200 rounded-full h-2">\
                  <div \
                    className=\{`h-2 rounded-full $\{\
                      index === 0 ? 'bg-blue-600' : \
                      index === 1 ? 'bg-green-500' : \
                      index === 2 ? 'bg-purple-500' : \
                      'bg-orange-500'\
                    \}`\} \
                    style=\{\{ width: `$\{category.value\}%` \}\}\
                  ></div>\
                </div>\
              </div>\
            ))\}\
          </div>\
        </div>\
      </div>\
    </div>\
  );\
  \
  // \uc0\u35373 \u23450 \u12475 \u12463 \u12471 \u12519 \u12531 \
  const SettingsSection = () => (\
    <div className="p-6">\
      <h2 className="text-2xl font-bold mb-6">\uc0\u12471 \u12473 \u12486 \u12512 \u35373 \u23450 </h2>\
      \
      <div className="bg-white rounded-lg shadow divide-y divide-gray-200">\
        <div className="p-6">\
          <h3 className="text-lg font-medium text-gray-900 mb-4">\uc0\u12469 \u12452 \u12488 \u35373 \u23450 </h3>\
          <div className="space-y-4">\
            <div>\
              <label className="block text-sm font-medium text-gray-700 mb-1">\
                \uc0\u12469 \u12452 \u12488 \u21517 \
              </label>\
              <input\
                type="text"\
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"\
                defaultValue="\uc0\u21205 \u30011 \u23398 \u32722 \u12503 \u12521 \u12483 \u12488 \u12501 \u12457 \u12540 \u12512 "\
              />\
            </div>\
            <div>\
              <label className="block text-sm font-medium text-gray-700 mb-1">\
                \uc0\u31649 \u29702 \u32773 \u12513 \u12540 \u12523 \u12450 \u12489 \u12524 \u12473 \
              </label>\
              <input\
                type="email"\
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"\
                defaultValue="admin@example.com"\
              />\
            </div>\
            <div className="flex items-center">\
              <input\
                type="checkbox"\
                id="maintenanceMode"\
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"\
                defaultChecked=\{false\}\
              />\
              <label htmlFor="maintenanceMode" className="ml-2 block text-sm text-gray-900">\
                \uc0\u12513 \u12531 \u12486 \u12490 \u12531 \u12473 \u12514 \u12540 \u12489 \
              </label>\
            </div>\
          </div>\
        </div>\
        \
        <div className="p-6 border-t border-gray-200">\
          <h3 className="text-lg font-medium text-gray-900 mb-4">\uc0\u12518 \u12540 \u12470 \u12540 \u35373 \u23450 </h3>\
          <div className="space-y-4">\
            <div>\
              <label className="block text-sm font-medium text-gray-700 mb-1">\
                \uc0\u26032 \u35215 \u30331 \u37682 \u12398 \u35377 \u21487 \
              </label>\
              <div className="flex items-center">\
                <div className="relative inline-block w-10 mr-2 align-middle select-none">\
                  <input\
                    type="checkbox"\
                    id="allowRegistration"\
                    className="sr-only"\
                    defaultChecked=\{true\}\
                  />\
                  <label\
                    htmlFor="allowRegistration"\
                    className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"\
                  >\
                    <span className="block h-6 w-6 rounded-full bg-white transform translate-x-4 transition-transform duration-200 ease-in"></span>\
                  </label>\
                </div>\
                <span className="text-sm text-gray-700">\uc0\u26377 \u21177 </span>\
              </div>\
            </div>\
            \
            <div>\
              <label className="block text-sm font-medium text-gray-700 mb-1">\
                \uc0\u12518 \u12540 \u12470 \u12540 \u30331 \u37682 \u12395 \u25215 \u35469 \u12364 \u24517 \u35201 \
              </label>\
              <div className="flex items-center">\
                <div className="relative inline-block w-10 mr-2 align-middle select-none">\
                  <input\
                    type="checkbox"\
                    id="requireApproval"\
                    className="sr-only"\
                    defaultChecked=\{false\}\
                  />\
                  <label\
                    htmlFor="requireApproval"\
                    className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"\
                  >\
                    <span className="block h-6 w-6 rounded-full bg-white transform translate-x-0 transition-transform duration-200 ease-in"></span>\
                  </label>\
                </div>\
                <span className="text-sm text-gray-700">\uc0\u28961 \u21177 </span>\
              </div>\
            </div>\
            \
            <div>\
              <label className="block text-sm font-medium text-gray-700 mb-1">\
                \uc0\u12487 \u12501 \u12457 \u12523 \u12488 \u12398 \u12518 \u12540 \u12470 \u12540 \u12525 \u12540 \u12523 \
              </label>\
              <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">\
                <option>\uc0\u19968 \u33324 \u12518 \u12540 \u12470 \u12540 </option>\
                <option>\uc0\u35611 \u24107 </option>\
                <option>\uc0\u31649 \u29702 \u32773 </option>\
              </select>\
            </div>\
          </div>\
        </div>\
        \
        <div className="p-6 border-t border-gray-200">\
          <h3 className="text-lg font-medium text-gray-900 mb-4">\uc0\u36890 \u30693 \u35373 \u23450 </h3>\
          <div className="space-y-4">\
            <div className="flex items-center justify-between">\
              <div>\
                <h4 className="text-sm font-medium text-gray-900">\uc0\u26032 \u35215 \u12518 \u12540 \u12470 \u12540 \u30331 \u37682 \u36890 \u30693 </h4>\
                <p className="text-sm text-gray-500">\uc0\u26032 \u12375 \u12356 \u12518 \u12540 \u12470 \u12540 \u12364 \u30331 \u37682 \u12375 \u12383 \u38555 \u12395 \u12513 \u12540 \u12523 \u36890 \u30693 \u12434 \u21463 \u12369 \u21462 \u12427 </p>\
              </div>\
              <div className="relative inline-block w-10 mr-2 align-middle select-none">\
                <input\
                  type="checkbox"\
                  id="notifyNewUsers"\
                  className="sr-only"\
                  defaultChecked=\{true\}\
                />\
                <label\
                  htmlFor="notifyNewUsers"\
                  className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"\
                >\
                  <span className="block h-6 w-6 rounded-full bg-white transform translate-x-4 transition-transform duration-200 ease-in"></span>\
                </label>\
              </div>\
            </div>\
            \
            <div className="flex items-center justify-between">\
              <div>\
                <h4 className="text-sm font-medium text-gray-900">\uc0\u12467 \u12540 \u12473 \u23436 \u20102 \u36890 \u30693 </h4>\
                <p className="text-sm text-gray-500">\uc0\u12518 \u12540 \u12470 \u12540 \u12364 \u12467 \u12540 \u12473 \u12434 \u23436 \u20102 \u12375 \u12383 \u38555 \u12395 \u12513 \u12540 \u12523 \u36890 \u30693 \u12434 \u21463 \u12369 \u21462 \u12427 </p>\
              </div>\
              <div className="relative inline-block w-10 mr-2 align-middle select-none">\
                <input\
                  type="checkbox"\
                  id="notifyCourseCompletion"\
                  className="sr-only"\
                  defaultChecked=\{true\}\
                />\
                <label\
                  htmlFor="notifyCourseCompletion"\
                  className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"\
                >\
                  <span className="block h-6 w-6 rounded-full bg-white transform translate-x-4 transition-transform duration-200 ease-in"></span>\
                </label>\
              </div>\
            </div>\
            \
            <div className="flex items-center justify-between">\
              <div>\
                <h4 className="text-sm font-medium text-gray-900">\uc0\u12471 \u12473 \u12486 \u12512 \u12450 \u12521 \u12540 \u12488 \u36890 \u30693 </h4>\
                <p className="text-sm text-gray-500">\uc0\u12471 \u12473 \u12486 \u12512 \u12398 \u12513 \u12531 \u12486 \u12490 \u12531 \u12473 \u12420 \u12456 \u12521 \u12540 \u30330 \u29983 \u26178 \u12395 \u36890 \u30693 \u12434 \u21463 \u12369 \u21462 \u12427 </p>\
              </div>\
              <div className="relative inline-block w-10 mr-2 align-middle select-none">\
                <input\
                  type="checkbox"\
                  id="notifySystemAlerts"\
                  className="sr-only"\
                  defaultChecked=\{true\}\
                />\
                <label\
                  htmlFor="notifySystemAlerts"\
                  className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"\
                >\
                  <span className="block h-6 w-6 rounded-full bg-white transform translate-x-4 transition-transform duration-200 ease-in"></span>\
                </label>\
              </div>\
            </div>\
          </div>\
        </div>\
        \
        <div className="p-6 border-t border-gray-200">\
          <h3 className="text-lg font-medium text-gray-900 mb-4">\uc0\u12496 \u12483 \u12463 \u12450 \u12483 \u12503 \u35373 \u23450 </h3>\
          <div className="space-y-4">\
            <div>\
              <label className="block text-sm font-medium text-gray-700 mb-1">\
                \uc0\u33258 \u21205 \u12496 \u12483 \u12463 \u12450 \u12483 \u12503 \u38971 \u24230 \
              </label>\
              <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">\
                <option>\uc0\u27598 \u26085 </option>\
                <option>\uc0\u27598 \u36913 </option>\
                <option>\uc0\u27598 \u26376 </option>\
                <option>\uc0\u12496 \u12483 \u12463 \u12450 \u12483 \u12503 \u12375 \u12394 \u12356 </option>\
              </select>\
            </div>\
            \
            <div>\
              <label className="block text-sm font-medium text-gray-700 mb-1">\
                \uc0\u20445 \u23384 \u12377 \u12427 \u12496 \u12483 \u12463 \u12450 \u12483 \u12503 \u12398 \u25968 \
              </label>\
              <input\
                type="number"\
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"\
                defaultValue="7"\
                min="1"\
                max="30"\
              />\
            </div>\
            \
            <div className="flex justify-between items-center">\
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">\
                \uc0\u20170 \u12377 \u12368 \u12496 \u12483 \u12463 \u12450 \u12483 \u12503 \
              </button>\
              \
              <button className="text-blue-600 hover:text-blue-800 text-sm">\
                \uc0\u12496 \u12483 \u12463 \u12450 \u12483 \u12503 \u23653 \u27508 \u12434 \u34920 \u31034 \
              </button>\
            </div>\
          </div>\
        </div>\
        \
        <div className="p-6 border-t border-gray-200">\
          <h3 className="text-lg font-medium text-gray-900 mb-4">\uc0\u21205 \u30011 \u12503 \u12524 \u12540 \u12516 \u12540 \u35373 \u23450 </h3>\
          <div className="space-y-4">\
            <div>\
            <label className="block text-sm font-medium text-gray-700 mb-1">\
                \uc0\u33258 \u21205 \u20877 \u29983 \
              </label>\
              <div className="flex items-center">\
                <div className="relative inline-block w-10 mr-2 align-middle select-none">\
                  <input\
                    type="checkbox"\
                    id="autoplay"\
                    className="sr-only"\
                    defaultChecked=\{false\}\
                  />\
                  <label\
                    htmlFor="autoplay"\
                    className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"\
                  >\
                    <span className="block h-6 w-6 rounded-full bg-white transform translate-x-0 transition-transform duration-200 ease-in"></span>\
                  </label>\
                </div>\
                <span className="text-sm text-gray-700">\uc0\u28961 \u21177 </span>\
              </div>\
            </div>\
            \
            <div>\
              <label className="block text-sm font-medium text-gray-700 mb-1">\
                \uc0\u12487 \u12501 \u12457 \u12523 \u12488 \u30011 \u36074 \
              </label>\
              <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">\
                <option>\uc0\u33258 \u21205 </option>\
                <option>1080p</option>\
                <option>720p</option>\
                <option>480p</option>\
                <option>360p</option>\
              </select>\
            </div>\
            \
            <div>\
              <label className="block text-sm font-medium text-gray-700 mb-1">\
                \uc0\u12487 \u12501 \u12457 \u12523 \u12488 \u20877 \u29983 \u36895 \u24230 \
              </label>\
              <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">\
                <option>0.75x</option>\
                <option>1.0x</option>\
                <option>1.25x</option>\
                <option>1.5x</option>\
                <option>2.0x</option>\
              </select>\
            </div>\
          </div>\
        </div>\
      </div>\
      \
      <div className="flex justify-end mt-6">\
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">\
          \uc0\u35373 \u23450 \u12434 \u20445 \u23384 \
        </button>\
      </div>\
    </div>\
  );\
  \
  // \uc0\u12513 \u12452 \u12531 \u12467 \u12531 \u12486 \u12531 \u12484 \u12475 \u12463 \u12471 \u12519 \u12531 \
  const MainContent = () => \{\
    if (loading) \{\
      return (\
        <div className="flex items-center justify-center h-screen">\
          <div className="text-center">\
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>\
            <p className="mt-4 text-gray-600">\uc0\u35501 \u12415 \u36796 \u12415 \u20013 ...</p>\
          </div>\
        </div>\
      );\
    \}\
\
    switch (activeSection) \{\
      case 'dashboard':\
        return <DashboardSection />;\
      case 'courses':\
        return <CoursesSection />;\
      case 'users':\
        return <UsersSection />;\
      case 'analytics':\
        return <AnalyticsSection />;\
      case 'settings':\
        return <SettingsSection />;\
      default:\
        return <DashboardSection />;\
    \}\
  \};\
\
  return (\
    <div className="bg-gray-100 min-h-screen">\
      <div className="flex">\
        <Sidebar />\
        <div className=\{`flex-1 $\{sidebarOpen ? 'ml-64' : 'ml-20'\} transition-all duration-300`\}>\
          <Header />\
          <main>\
            <MainContent />\
          </main>\
        </div>\
      </div>\
    </div>\
  );\
\};\
\
export default AdminDashboard;}