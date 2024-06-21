// components/Allcourse.js
import React, { useContext, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import CourseService from '../../Services/CourseService';
import { courseContext } from './coursContext';

const Allcourse = () => {
  const {courses, setCourses} = useContext(courseContext);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await CourseService.getAllCourse();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses', error);
      }
    };

    fetchCourses();
  }, [setCourses]);

  const handleEdit = (courseId) => {
    console.log(`Editing course with ID ${courseId}`);
  };

  const handleDelete = (courseId) => {
    console.log(`Deleting course with ID ${courseId}`);
  };

  return (
    <div className="allCourse">
      <table>
        <thead>
          <tr>
            <th className="name">Name</th>
            <th>Duration</th>
            <th>Teacher</th>
            <th>Student</th>
            <th className="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>{course.duration} Hours</td>
              <td>{course.teacherName}</td>
              <td>{course.students.length}</td>
              <td>
                <button className="action-button" onClick={() => handleEdit(course.id)}>
                  <FaEdit className="action-icon edit-icon" />
                </button>
                <button className="action-button" onClick={() => handleDelete(course.id)}>
                  <FaTrash className="action-icon delete-icon" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Allcourse;
