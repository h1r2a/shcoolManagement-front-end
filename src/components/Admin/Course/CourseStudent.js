import React, { useContext, useState, useEffect } from "react";
import "./courseStudent.css";
import { courseContext } from "./coursContext";
import Modal from "react-modal";
import StudentService from "../../Services/StudiantService";
import toastr from "toastr";
import "toastr/build/toastr.min.css"; // Importez le fichier CSS toastr
Modal.setAppElement("#root");

const CourseStudent = () => {
  const { courses } = useContext(courseContext);
  const [studentOfCurrentCourse, setStudentOfCurrentCourse] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentNotsIn, setStudentsNotIn] = useState([]);
  const [newStudentIds, setNewStudentIds] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null); // Variable d'état pour stocker l'ID du cours sélectionné

  useEffect(() => {
    // Vérifier si un cours est déjà sélectionné au chargement initial
    if (selectedCourseId) {
      fetchStudentNotIn(selectedCourseId);
    }
  }, [selectedCourseId]);

  const fetchStudentNotIn = async (coursId) => {
    try {
      const data = await StudentService.getAllStudentNonePartOfTheCourse(coursId);
      setStudentsNotIn(data);
      console.log("student not in", data);
    } catch (error) {
      toastr.error(error.response.data);
    }
  };

  const handleCourseChange = async (event) => {
    const selectedCourseName = event.target.value;
    const selectedCourse = courses.find((course) => course.name === selectedCourseName);
    if (selectedCourse) {
      setStudentOfCurrentCourse(selectedCourse.students);
      setSelectedCourseId(selectedCourse.id); // Mettre à jour l'ID du cours sélectionné
      await fetchStudentNotIn(selectedCourse.id); // Appel pour récupérer les étudiants non inclus
    } else {
      setStudentOfCurrentCourse([]);
      setSelectedCourseId(null);
      setStudentsNotIn([]); // Réinitialisation de la liste des étudiants non inclus si aucun cours sélectionné
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewStudentIds([]); // Réinitialiser les IDs des nouveaux étudiants sélectionnés
  };

  const handleStudentSelect = (studentId) => {
    if (newStudentIds.includes(studentId)) {
      setNewStudentIds(newStudentIds.filter((id) => id !== studentId));
    } else {
      setNewStudentIds([...newStudentIds, studentId]);
    }
  };

  const handleConfirm = async () => {
    if (selectedCourseId && newStudentIds.length > 0) {
      try {
        // Appel à votre service pour ajouter les étudiants au cours
        await StudentService.addStudentToCourse(selectedCourseId, newStudentIds);

        // Récupération des détails des nouveaux étudiants ajoutés
        const addedStudentsDetails = studentNotsIn.filter((student) =>
          newStudentIds.includes(student.id)
        );

        // Construire les noms complets des nouveaux étudiants
        const newStudents = addedStudentsDetails.map(
          (student) => `${student.firstName} ${student.lastName}`
        );

        // Mettre à jour studentOfCurrentCourse avec les nouveaux étudiants ajoutés
        const updatedStudents = [
          ...studentOfCurrentCourse,
          ...newStudents
        ];

        // Mettre à jour l'état des étudiants du cours
        setStudentOfCurrentCourse(updatedStudents);

        // Affichage d'un Toastr de succès
        toastr.success("Students added successfully to the course.");

        // Fermer le modal après l'ajout
        closeModal();

        // Rafraîchir la liste des étudiants non inclus
        await fetchStudentNotIn(selectedCourseId);

      } catch (error) {
        console.error("Add students error: ", error);
        toastr.error("Failed to add students to the course.");
      }
    } else {
      toastr.error("Please select a course and at least one student.");
    }
  };

  return (
    <div>
      <div className="courseHeader">
        <select name="course" id="courseSelect" onChange={handleCourseChange}>
        <option value="" selected disabled>SELECT A COURSE</option>
          {courses.map((course) => (

            <option key={course.id} value={course.name}>
              {course.name}
            </option>
          ))}
        </select>
        <button className="addCourseButton" onClick={openModal}>
          Add Students
        </button>
      </div>
      <div className="studentList">
        {studentOfCurrentCourse.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {studentOfCurrentCourse.map((student, index) => (
                <tr key={index}>
                  <td>{student}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No student yet for this course</p>
        )}
      </div>

      {/* Modal for adding students */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Students Modal"
        className="modal"
        overlayClassName="overlay"
        style={{
          content: {
            borderRadius: "50px",
            width: "60%", // Ajustez la largeur selon vos besoins
            maxHeight: "90vh",
            overflowY: "scroll",
            margin: "auto", // Centrer le modal horizontalement
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Couleur de l'arrière-plan de l'overlay
          },
        }}
      >
        <h2>Add Students</h2>
        <button onClick={closeModal} className="closeModalButton">
          Close
        </button>

        <div className="studentList">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Level</th>
                <th>Email</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {studentNotsIn.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.firstName} {student.lastName}</td>
                  <td>{student.level}</td>
                  <td>{student.email}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={newStudentIds.includes(student.id)}
                      onChange={() => handleStudentSelect(student.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button onClick={handleConfirm} className="confirmButton">
          Confirm
        </button>
      </Modal>
    </div>
  );
};

export default CourseStudent;
