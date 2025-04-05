import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import AppRoutes from './routes';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ErrorFallback from './components/ErrorFallback';
import './styles/app-styles.css';

// Reduxストアの設定
const store = configureStore({
  reducer: {
    // ここにリデューサーを追加
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// エラーハンドリング
const logError = (error, errorInfo) => {
  console.error('エラーが発生しました:', error, errorInfo);
  // ここでエラーログをサーバーに送信
};

// パフォーマンスモニタリング
const reportWebVitals = (metric) => {
  console.log(metric);
  // ここでパフォーマンスメトリクスを収集
};

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider>
            <AuthProvider>
              <Router>
                <div className="app">
                  <AppRoutes />
                </div>
              </Router>
            </AuthProvider>
          </ThemeProvider>
        </I18nextProvider>
      </Provider>
    </ErrorBoundary>
  );
};

// パフォーマンスモニタリングの設定
if (process.env.NODE_ENV === 'production') {
  const { reportWebVitals: report } = require('./reportWebVitals');
  report(reportWebVitals);
}

export default App; 