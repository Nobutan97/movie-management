import React from 'react';
import { 
  Users, 
  BookOpen, 
  Award, 
  DollarSign,
  Calendar
} from 'lucide-react';

const AnalyticsContent = () => {
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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">統計・分析</h2>

      <div className="mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <button className="text-gray-700 px-3 py-1 rounded-md text-sm bg-gray-100">日間</button>
              <button className="text-gray-700 px-3 py-1 rounded-md text-sm">週間</button>
              <button className="text-gray-700 px-3 py-1 rounded-md text-sm">月間</button>
              <button className="text-gray-700 px-3 py-1 rounded-md text-sm">年間</button>
            </div>
            <div className="relative flex items-center">
              <input
                type="date"
                className="p-1 text-sm border border-gray-300 rounded-md"
              />
              <span className="mx-2">〜</span>
              <input
                type="date"
                className="p-1 text-sm border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="新規ユーザー"
          value="124"
          subValue="先週比 +12%"
          icon={Users}
        />
        <StatCard
          title="コース登録数"
          value="356"
          subValue="先週比 +8%"
          icon={BookOpen}
        />
        <StatCard
          title="コース完了数"
          value="98"
          subValue="先週比 +15%"
          icon={Award}
        />
        <StatCard
          title="総収益"
          value="¥1,245,600"
          subValue="先週比 +5%"
          icon={DollarSign}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-4">ユーザー登録推移</h3>
          <div className="h-80 flex items-center justify-center text-gray-500">
            グラフ表示エリア
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-4">コース別受講者数</h3>
          <div className="h-80 flex items-center justify-center text-gray-500">
            グラフ表示エリア
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-4">時間帯別アクセス数</h3>
          <div className="h-80 flex items-center justify-center text-gray-500">
            グラフ表示エリア
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-4">カテゴリー別受講者分布</h3>
          <div className="h-80 flex items-center justify-center text-gray-500">
            グラフ表示エリア
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsContent; 