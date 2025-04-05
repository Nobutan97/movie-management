import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const VideoForm = ({ onSubmit }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [videoType, setVideoType] = useState('youtube');
  const [videoUrl, setVideoUrl] = useState('');
  const [embedCode, setEmbedCode] = useState('');
  const [sequenceOrder, setSequenceOrder] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [showEmbedCode, setShowEmbedCode] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const result = await onSubmit(courseId, {
        title,
        description,
        duration: parseInt(duration) || 0,
        video_type: videoType,
        video_url: videoUrl,
        embed_code: embedCode,
        sequence_order: parseInt(sequenceOrder) || 1
      });

      if (result.success) {
        // フォームをリセットして続けて追加できるようにする
        setTitle('');
        setDescription('');
        setDuration(0);
        setVideoUrl('');
        setEmbedCode('');
        setSequenceOrder(sequenceOrder + 1);
        
        // 成功メッセージを表示
        alert('動画を追加しました！続けて追加するか、コース一覧に戻ることができます。');
      } else {
        setError(result.error || '動画の追加に失敗しました');
      }
    } catch (err) {
      setError('動画の追加中にエラーが発生しました: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // 動画タイプが変更された時の処理
  useEffect(() => {
    setShowEmbedCode(videoType === 'custom');
  }, [videoType]);

  return (
    <div className="video-form">
      <h2>動画の追加</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">動画タイトル</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">動画説明</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">動画時間（秒）</label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            min="0"
            required
          />
          <small>※動画の長さを秒単位で入力してください（例: 10分の場合は600）</small>
        </div>

        <div className="form-group">
          <label htmlFor="videoType">動画タイプ</label>
          <select
            id="videoType"
            value={videoType}
            onChange={(e) => setVideoType(e.target.value)}
          >
            <option value="youtube">YouTube</option>
            <option value="vimeo">Vimeo</option>
            <option value="mp4">MP4 (直接URL)</option>
            <option value="custom">カスタム埋め込み</option>
          </select>
        </div>

        {!showEmbedCode && (
          <div className="form-group">
            <label htmlFor="videoUrl">動画URL</label>
            <input
              type="url"
              id="videoUrl"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder={
                videoType === 'youtube'
                  ? 'https://www.youtube.com/watch?v=...'
                  : videoType === 'vimeo'
                  ? 'https://vimeo.com/...'
                  : 'https://example.com/video.mp4'
              }
              required
            />
          </div>
        )}

        {showEmbedCode && (
          <div className="form-group">
            <label htmlFor="embedCode">埋め込みコード</label>
            <textarea
              id="embedCode"
              value={embedCode}
              onChange={(e) => setEmbedCode(e.target.value)}
              rows={5}
              placeholder="<iframe src=... または <video>..."
              required
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="sequenceOrder">表示順序</label>
          <input
            type="number"
            id="sequenceOrder"
            value={sequenceOrder}
            onChange={(e) => setSequenceOrder(e.target.value)}
            min="1"
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/admin/courses')}>
            コース一覧に戻る
          </button>
          <button type="submit" disabled={submitting}>
            {submitting ? '追加中...' : '動画を追加'}
          </button>
        </div>
      </form>
    </div>
  );
};

VideoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default VideoForm; 