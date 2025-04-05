// VideoPlayer.jsx - 動画プレーヤーコンポーネント
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// 動画タイプに応じたプレーヤーを選択
const VideoPlayer = ({ video, token }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [logId, setLogId] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [watchedSeconds, setWatchedSeconds] = useState(0);
  const [progress, setProgress] = useState(0);
  const watchTimerRef = useRef(null);
  const lastActivityRef = useRef(Date.now());
  const videoRef = useRef(null);
  
  // コンポーネントの初期化・クリーンアップ
  useEffect(() => {
    // コンポーネントのアンマウント時にタイマーをクリア
    return () => {
      if (watchTimerRef.current) {
        clearInterval(watchTimerRef.current);
      }
      // 再生中なら視聴ログを終了
      if (isPlaying && logId) {
        endViewSession();
      }
    };
  }, [isPlaying, logId]);

  // 視聴開始ログの記録
  const startViewSession = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/view-logs/start`,
        { videoId: video.id },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      setLogId(response.data.log_id);
      setStartTime(new Date(response.data.started_at));
      setIsPlaying(true);
      
      // タイマーを開始
      watchTimerRef.current = setInterval(updateWatchTime, 1000);
      lastActivityRef.current = Date.now();
    } catch (error) {
      console.error('視聴ログの開始に失敗しました:', error);
    }
  };
  
  // 視聴終了ログの更新
  const endViewSession = async () => {
    if (!logId) return;
    
    try {
      // 最終的な視聴時間を計算
      const elapsedSeconds = Math.round((Date.now() - lastActivityRef.current) / 1000);
      const totalWatchTime = watchedSeconds + (isPlaying ? elapsedSeconds : 0);
      
      // 動画の進捗率を計算（%）
      const videoProgress = video.duration ? Math.min(100, Math.round((totalWatchTime / video.duration) * 100)) : 0;
      
      // 視聴完了とみなす閾値（例: 90%以上視聴で完了）
      const isCompleted = videoProgress >= 90;
      
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/view-logs/end/${logId}`,
        {
          duration_seconds: totalWatchTime,
          progress_percentage: videoProgress,
          completed: isCompleted
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      // 状態リセット
      setIsPlaying(false);
      clearInterval(watchTimerRef.current);
      watchTimerRef.current = null;
    } catch (error) {
      console.error('視聴ログの終了に失敗しました:', error);
    }
  };
  
  // 視聴時間の更新（タイマーごとに呼び出し）
  const updateWatchTime = () => {
    if (isPlaying) {
      const now = Date.now();
      const elapsedSeconds = Math.floor((now - lastActivityRef.current) / 1000);
      
      if (elapsedSeconds > 0) {
        setWatchedSeconds(prev => prev + elapsedSeconds);
        
        // 進捗率の更新
        if (video.duration) {
          const newProgress = Math.min(100, Math.round(((watchedSeconds + elapsedSeconds) / video.duration) * 100));
          setProgress(newProgress);
        }
      }
      
      lastActivityRef.current = now;
    }
  };
  
  // プレーヤー制御ハンドラ
  const handlePlay = () => {
    if (!isPlaying) {
      startViewSession();
    }
  };
  
  const handlePause = () => {
    if (isPlaying) {
      endViewSession();
    }
  };
  
  const handleEnded = () => {
    if (isPlaying) {
      endViewSession();
    }
  };
  
  // 継続的なユーザー活動の検出
  useEffect(() => {
    const handleActivity = () => {
      lastActivityRef.current = Date.now();
    };
    
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);
    
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, []);
  
  // 動画タイプに応じたレンダリング
  const renderVideoPlayer = () => {
    switch(video.video_type) {
      case 'youtube':
        return renderYouTubePlayer();
      case 'vimeo':
        return renderVimeoPlayer();
      case 'mp4':
        return renderHTML5Player();
      case 'custom':
        return renderCustomEmbed();
      default:
        return <div>未対応の動画タイプです</div>;
    }
  };
  
  // YouTube埋め込み
  const renderYouTubePlayer = () => {
    // YouTubeのURLからビデオIDを抽出
    const getYouTubeId = (url) => {
      const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\?]*)/);
      return match ? match[1] : null;
    };
    
    const videoId = getYouTubeId(video.video_url);
    
    if (!videoId) return <div>無効なYouTube URLです</div>;
    
    // YouTube iframe APIを使った埋め込み
    return (
      <div className="video-container">
        <iframe
          width="100%"
          height="480"
          src={`https://player.vimeo.com/video/${videoId}?api=1`}
          title={video.title}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          ref={videoRef}
          onLoad={() => {
            // Vimeo Player APIを初期化
            if (window.Vimeo && window.Vimeo.Player) {
              const player = new window.Vimeo.Player(videoRef.current);
              
              player.on('play', handlePlay);
              player.on('pause', handlePause);
              player.on('ended', handleEnded);
            }
          }}
        />
      </div>
    );
  };
  
  // HTML5標準動画プレーヤー
  const renderHTML5Player = () => {
    return (
      <div className="video-container">
        <video
          ref={videoRef}
          width="100%"
          height="auto"
          controls
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
        >
          <source src={video.video_url} type="video/mp4" />
          お使いのブラウザは動画再生に対応していません。
        </video>
      </div>
    );
  };
  
  // カスタム埋め込みコード
  const renderCustomEmbed = () => {
    if (!video.embed_code) return <div>埋め込みコードが設定されていません</div>;
    
    return (
      <div 
        className="video-container custom-embed"
        dangerouslySetInnerHTML={{ __html: video.embed_code }}
        ref={(el) => {
          videoRef.current = el;
          
          // DOM挿入後にカスタムスクリプトを実行
          if (el) {
            setTimeout(() => {
              // カスタム埋め込みの場合は、再生・一時停止のイベントを手動で設定する必要がある場合がある
              // ここでイベントリスナーをアタッチする処理を追加できます
              const videoElement = el.querySelector('video');
              if (videoElement) {
                videoElement.addEventListener('play', handlePlay);
                videoElement.addEventListener('pause', handlePause);
                videoElement.addEventListener('ended', handleEnded);
              }
            }, 500);
          }
        }}
      />
    );
  };
  
  return (
    <div className="video-player-wrapper">
      <h2>{video.title}</h2>
      {renderVideoPlayer()}
      
      <div className="video-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="progress-text">
          {progress}% 視聴済み ({Math.floor(watchedSeconds / 60)}分{watchedSeconds % 60}秒)
        </div>
      </div>
      
      {video.description && (
        <div className="video-description">
          <h3>概要</h3>
          <p>{video.description}</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer; className="video-container">
        <iframe
          width="100%"
          height="480"
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => {
            // YouTube Player APIを初期化
            if (window.YT && window.YT.Player) {
              new window.YT.Player(videoRef.current, {
                events: {
                  onStateChange: (event) => {
                    // 再生開始
                    if (event.data === window.YT.PlayerState.PLAYING) {
                      handlePlay();
                    }
                    // 一時停止
                    else if (event.data === window.YT.PlayerState.PAUSED) {
                      handlePause();
                    }
                    // 再生終了
                    else if (event.data === window.YT.PlayerState.ENDED) {
                      handleEnded();
                    }
                  }
                }
              });
            }
          }}
          ref={videoRef}
        />
      </div>
    );
  };
  
  // Vimeo埋め込み
  const renderVimeoPlayer = () => {
    // VimeoのURLからビデオIDを抽出
    const getVimeoId = (url) => {
      const match = url.match(/vimeo\.com\/(\d+)/);
      return match ? match[1] : null;
    };
    
    const videoId = getVimeoId(video.video_url);
    
    if (!videoId) return <div>無効なVimeo URLです</div>;
    
    return (
      <div