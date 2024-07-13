import React, { useEffect, useState } from "react";
import { TeacherService } from "../../Services/TeacherService";
import toastr from "toastr";
import "./newCourse.css";
import CourseService from "../../Services/CourseService";

const NewCourse = () => {
  const [teacherList, setTeacherList] = useState([]);
  const [teacherSelected, setTeacherSelected] = useState(null); // state pour stocker l'ID du professeur sélectionné
  const [newCourse, setNewCourse] = useState({
    name: "",
    duration: 60,
    description: "",
    teacherId: null
  });

  const getTeachers = async () => {
    try {
      const teachers = await TeacherService.getAllTeachers();
      setTeacherList(teachers);
    } catch (error) {
      toastr.error(error.message);
    }
  };

  const handleTeacherChange = (event) => {
    const selectedTeacherId = event.target.value;
    setTeacherSelected(selectedTeacherId); // Mettre à jour l'ID du professeur sélectionné

    // Mettre à jour newCourse avec l'ID du professeur sélectionné
    setNewCourse({ ...newCourse, teacherId: selectedTeacherId });
  };

  const createCourse = async () => {
    try {
      const course = await CourseService.createCourse(newCourse);
      toastr.success("Course " + course.data.name + " created successfully");
      resetForm(); // Réinitialiser le formulaire après la création du cours
    } catch (error) {
      toastr.error(error.message);
    }
  };

  const resetForm = () => {
    setNewCourse({
      name: "",
      duration: 60,
      description: "",
      teacherId: null
    });
    setTeacherSelected(null); // Réinitialiser la sélection du professeur
  };

  useEffect(() => {
    getTeachers();
  }, []);

  return (
    <div className="newCourse">
      <div className="courseFormRow">
        <div className="form-group">
          <label>Name of the course*</label>
          <input
            type="text"
            placeholder="Name of the new course"
            value={newCourse.name}
            onChange={(e) =>
              setNewCourse({ ...newCourse, name: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Duration in Hours*</label>
          <input
            type="number"
            min={0}
            max={200}
            value={newCourse.duration}
            onChange={(e) =>
              setNewCourse({
                ...newCourse,
                duration: parseInt(e.target.value)
              })
            }
          />
        </div>
      </div>
      <div className="courseFormRow">
        <div className="form-group">
          <select
            name="course"
            id="courseSelect"
            onChange={handleTeacherChange}
            value={teacherSelected}
          >
            <option selected value={0} disabled>
              SELECT A TEACHER
            </option>
            {teacherList.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.firstName + " " + teacher.lastname}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="">Description of the course</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="1"
            value={newCourse.description}
            onChange={(e) =>
              setNewCourse({ ...newCourse, description: e.target.value })
            }
          ></textarea>
        </div>
      </div>

      <div className="courseAdded form-group">
        <button className="confirmButton" onClick={createCourse}>
          Create
        </button>
      </div>
    </div>
  );
};

export default NewCourse;
