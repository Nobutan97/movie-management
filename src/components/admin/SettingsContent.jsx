import React from 'react';
import { Save } from 'lucide-react';

const SettingsContent = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">システム設定</h2>

      <div className="max-w-3xl">
        <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
          {/* サイト設定 */}
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">サイト設定</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  サイト名
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="動画視聴管理システム"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  サイトの説明
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  defaultValue="オンライン学習プラットフォーム"
                />
              </div>
            </div>
          </div>

          {/* メール設定 */}
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">メール設定</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  送信元メールアドレス
                </label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="noreply@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SMTPサーバー
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="smtp.example.com"
                />
              </div>
            </div>
          </div>

          {/* 通知設定 */}
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">通知設定</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="email-notifications"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-900">
                  メール通知を有効にする
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="browser-notifications"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="browser-notifications" className="ml-2 block text-sm text-gray-900">
                  ブラウザ通知を有効にする
                </label>
              </div>
            </div>
          </div>

          {/* セキュリティ設定 */}
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">セキュリティ設定</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  セッションタイムアウト（分）
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue={30}
                />
              </div>
              <div className="flex items-center">
                <input
                  id="two-factor-auth"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="two-factor-auth" className="ml-2 block text-sm text-gray-900">
                  二段階認証を有効にする
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <Save size={16} className="mr-2" />
            設定を保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsContent; 