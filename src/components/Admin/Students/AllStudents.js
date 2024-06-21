import React, { useEffect, useState } from "react";
import toastr from "toastr";
import StudentService from "../../Services/StudiantService";
import { FaEdit, FaTrash } from "react-icons/fa";

const AllStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const data = await StudentService.getAllstudent();
        setStudents(data);
        // students.length==0?toastr.info("No student found"):''s
      } catch (error) {
        toastr.error(error);
      }

    };      getStudents();
  }, []);
  const handleEdit = (courseId) => {
    console.log(`Editing course with ID ${courseId}`);
  };

  const handleDelete = (courseId) => {
    console.log(`Deleting course with ID ${courseId}`);
  };


  return <div className="allStudent">
         <table>
        <thead>
          <tr>
            <th className="name">Name</th>
            <th>level</th>
            <th>Email</th>
            <th>Courses</th>
            <th className="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.firstName +' '+student.lastName}</td>
              <td>{student.level} </td>
              <td>{student.email}</td>
              <td>{student.course.length}</td>
              <td>
                <button className="action-button" onClick={() => handleEdit(student.id)}>
                  <FaEdit className="action-icon edit-icon" />
                </button>
                <button className="action-button" onClick={() => handleDelete(student.id)}>
                  <FaTrash className="action-icon delete-icon" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>



  </div>;
};

export default AllStudents;
