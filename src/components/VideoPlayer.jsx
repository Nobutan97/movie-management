import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './VideoPlayer.css';

const VideoPlayer = ({
  videoUrl,
  title,
  onTimeUpdate,
  onEnded,
  subtitles,
  playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2],
  playlist = [],
  onNextVideo,
  onPreviousVideo,
}) => {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState(null);

  // キーボードショートカット
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'm':
          toggleMute();
          break;
        case 'ArrowLeft':
          skip(-5);
          break;
        case 'ArrowRight':
          skip(5);
          break;
        case 'ArrowUp':
          adjustVolume(0.1);
          break;
        case 'ArrowDown':
          adjustVolume(-0.1);
          break;
        case 'f':
          toggleFullscreen();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 字幕の更新
  useEffect(() => {
    if (!showSubtitles || !subtitles) return;

    const updateSubtitle = () => {
      const currentSub = subtitles.find(
        sub => currentTime >= sub.start && currentTime <= sub.end
      );
      setCurrentSubtitle(currentSub);
    };

    updateSubtitle();
  }, [currentTime, subtitles, showSubtitles]);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const adjustVolume = (change) => {
    const newVolume = Math.max(0, Math.min(1, volume + change));
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const skip = (seconds) => {
    videoRef.current.currentTime += seconds;
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
    onTimeUpdate?.(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  return (
    <div className="video-player">
      <video
        ref={videoRef}
        src={videoUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={onEnded}
        onClick={togglePlay}
      />
      
      <div className="video-controls">
        <button onClick={togglePlay}>
          {isPlaying ? t('pause') : t('play')}
        </button>
        
        <div className="time-display">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
        
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={(e) => {
            videoRef.current.currentTime = e.target.value;
            setCurrentTime(e.target.value);
          }}
        />
        
        <button onClick={toggleMute}>
          {isMuted ? t('unmute') : t('mute')}
        </button>
        
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => adjustVolume(e.target.value - volume)}
        />
        
        <select
          value={playbackRate}
          onChange={(e) => {
            videoRef.current.playbackRate = e.target.value;
            setPlaybackRate(e.target.value);
          }}
        >
          {playbackRates.map(rate => (
            <option key={rate} value={rate}>{rate}x</option>
          ))}
        </select>
        
        {subtitles && (
          <button onClick={() => setShowSubtitles(!showSubtitles)}>
            {t('subtitles')}
          </button>
        )}
        
        <button onClick={toggleFullscreen}>
          {t('fullscreen')}
        </button>
      </div>
      
      {showSubtitles && currentSubtitle && (
        <div className="subtitle-display">
          {currentSubtitle.text}
        </div>
      )}
      
      {playlist.length > 0 && (
        <div className="playlist">
          <h3>{t('playlist')}</h3>
          <ul>
            {playlist.map((video, index) => (
              <li
                key={index}
                className={videoUrl === video.url ? 'active' : ''}
                onClick={() => onNextVideo?.(index)}
              >
                {video.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
  onTimeUpdate: PropTypes.func,
  onEnded: PropTypes.func,
  subtitles: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.number.isRequired,
      end: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  playbackRates: PropTypes.arrayOf(PropTypes.number),
  playlist: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
  onNextVideo: PropTypes.func,
  onPreviousVideo: PropTypes.func,
};

export default VideoPlayer; 