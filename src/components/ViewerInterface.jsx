import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import VideoPlayer from './VideoPlayer';
import './ViewerInterface.css';

const ViewerInterface = ({
  course,
  videos,
  onVideoSelect,
  onFavoriteToggle,
  onProgressUpdate,
}) => {
  const { t } = useTranslation();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [viewingHistory, setViewingHistory] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('sequence');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // お気に入りと視聴履歴の読み込み
    const loadUserData = async () => {
      try {
        const [favoritesRes, historyRes] = await Promise.all([
          fetch('/api/favorites'),
          fetch('/api/viewing-history')
        ]);
        const [favoritesData, historyData] = await Promise.all([
          favoritesRes.json(),
          historyRes.json()
        ]);
        setFavorites(favoritesData);
        setViewingHistory(historyData);
      } catch (error) {
        console.error('データの読み込みに失敗しました:', error);
      }
    };

    loadUserData();
  }, []);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    onVideoSelect?.(video);
  };

  const handleFavoriteToggle = async (videoId) => {
    try {
      const response = await fetch(`/api/favorites/${videoId}`, {
        method: 'POST',
      });
      const updatedFavorites = await response.json();
      setFavorites(updatedFavorites);
      onFavoriteToggle?.(videoId);
    } catch (error) {
      console.error('お気に入りの更新に失敗しました:', error);
    }
  };

  const handleProgressUpdate = (videoId, progress) => {
    setViewingHistory(prev => {
      const updated = prev.map(item => 
        item.videoId === videoId ? { ...item, progress } : item
      );
      onProgressUpdate?.(videoId, progress);
      return updated;
    });
  };

  const filteredVideos = videos.filter(video => {
    const matchesFilter = filter === 'all' || 
      (filter === 'favorites' && favorites.includes(video.id)) ||
      (filter === 'watched' && viewingHistory.some(h => h.videoId === video.id));
    
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const sortedVideos = [...filteredVideos].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'duration':
        return a.duration - b.duration;
      case 'progress':
        const progressA = viewingHistory.find(h => h.videoId === a.id)?.progress || 0;
        const progressB = viewingHistory.find(h => h.videoId === b.id)?.progress || 0;
        return progressB - progressA;
      default:
        return a.sequence - b.sequence;
    }
  });

  return (
    <div className="viewer-interface">
      <div className="video-container">
        {selectedVideo ? (
          <VideoPlayer
            videoUrl={selectedVideo.url}
            title={selectedVideo.title}
            onTimeUpdate={(time) => handleProgressUpdate(selectedVideo.id, time)}
            onEnded={() => handleProgressUpdate(selectedVideo.id, 100)}
          />
        ) : (
          <div className="video-placeholder">
            {t('selectVideo')}
          </div>
        )}
      </div>

      <div className="video-list">
        <div className="controls">
          <input
            type="text"
            placeholder={t('searchVideos')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">{t('allVideos')}</option>
            <option value="favorites">{t('favorites')}</option>
            <option value="watched">{t('watched')}</option>
          </select>
          
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="sequence">{t('sequence')}</option>
            <option value="title">{t('title')}</option>
            <option value="duration">{t('duration')}</option>
            <option value="progress">{t('progress')}</option>
          </select>
        </div>

        <ul className="video-list-items">
          {sortedVideos.map(video => {
            const progress = viewingHistory.find(h => h.videoId === video.id)?.progress || 0;
            const isFavorite = favorites.includes(video.id);
            
            return (
              <li
                key={video.id}
                className={`video-item ${selectedVideo?.id === video.id ? 'selected' : ''}`}
                onClick={() => handleVideoSelect(video)}
              >
                <div className="video-thumbnail">
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="progress-bar" style={{ width: `${progress}%` }} />
                </div>
                
                <div className="video-info">
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                  <div className="video-meta">
                    <span>{formatDuration(video.duration)}</span>
                    <button
                      className={`favorite-button ${isFavorite ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFavoriteToggle(video.id);
                      }}
                    >
                      {isFavorite ? '★' : '☆'}
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

ViewerInterface.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      url: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
      sequence: PropTypes.number.isRequired,
      thumbnail: PropTypes.string,
    })
  ).isRequired,
  onVideoSelect: PropTypes.func,
  onFavoriteToggle: PropTypes.func,
  onProgressUpdate: PropTypes.func,
};

export default ViewerInterface; 