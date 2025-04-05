import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const CourseForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const result = await onSubmit({
      title,
      description
    });

    setSubmitting(false);

    if (result.success) {
      navigate(`/admin/courses/${result.course.id}/videos/new`);
    }
  };

  return (
    <div className="course-form">
      <h2>新規コース作成</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">コースタイトル</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">コース説明</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/admin/courses')}>
            キャンセル
          </button>
          <button type="submit" disabled={submitting}>
            {submitting ? '作成中...' : 'コースを作成'}
          </button>
        </div>
      </form>
    </div>
  );
};

CourseForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default CourseForm; 