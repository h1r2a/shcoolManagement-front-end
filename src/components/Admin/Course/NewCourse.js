// NewCourse.js
import React from 'react';

const NewCourse = () => {
  return (
    <div className='newCourse'>
      <h2>Add a New Course</h2>
      <form>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Course Name</label>
            <input type="text" id="name" name="name" placeholder="Enter course name" />
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duration</label>
            <input type="number" id="duration" name="duration" placeholder="Enter course duration" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" placeholder="Enter course description"></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="teacherId">Teacher ID</label>
          <input type="number" id="teacherId" name="teacherId" placeholder="Enter teacher ID" />
        </div>
        <button type="submit" className="submit-button">Add Course</button>
      </form>
    </div>
  );
}

export default NewCourse;
