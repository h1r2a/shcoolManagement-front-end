// services/CourseService.js
import axios from 'axios';
import toastr from 'toastr';

const API_URL_COURSE = 'http://localhost:8080/api/course';

const CourseService = {
  getAllCourse: async () => {
    try {
      const response = await axios.get(API_URL_COURSE);
      return response.data;
    } catch (error) {
      toastr.error(error.response.data);
      return []; // Retourne un tableau vide en cas d'erreur
    }
  },


};

export default CourseService;
