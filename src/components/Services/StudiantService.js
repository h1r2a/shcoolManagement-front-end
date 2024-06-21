import axios from "axios";
import toastr from "toastr";

const API_URL_STUDENT = "http://localhost:8080/api/etudiant";
const API_URL_COURSE = "http://localhost:8080/api/course/addStudent";

const StudentService = {
  getAllstudent: async () => {
    try {
      const response = await axios.get(API_URL_STUDENT);
      console.log(response);
      return response.data;
    } catch (error) {
      toastr.error(error.response.data);
      return [];
    }
  },

  getAllStudentNonePartOfTheCourse: async (coursId) => {
    try {
      const response = await axios.get(`${API_URL_STUDENT}/notInCourse/${coursId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      toastr.error(error.response.data);
      return [];
    }
  },

  addStudentToCourse: async (courseId, studentIds) => {
    try {
      const payload = {
        courseId: courseId,
        studentIds: studentIds,
      };
      const response = await axios.post(API_URL_COURSE, payload);
      console.log(response.data); // Réponse de la requête POST
      return response.data; // Si nécessaire
    } catch (error) {
      toastr.error(error.response.data);
      return null; // Gérer les erreurs selon vos besoins
    }
  },
};

export default StudentService;
