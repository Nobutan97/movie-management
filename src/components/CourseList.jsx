import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CourseList = ({ courses }) => {
  if (!courses || courses.length === 0) {
    return <div>コースがありません</div>;
  }

  return (
    <div className="course-list">
      <h2>コース一覧</h2>
      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <div className="course-actions">
              <Link to={`/admin/courses/${course.id}/videos/new`}>
                動画を追加
              </Link>
              <Link to={`/admin/courses/${course.id}/stats`}>
                統計を表示
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  ).isRequired
};

export default CourseList; 