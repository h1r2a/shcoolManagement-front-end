import axios from "axios";


const API_URL_TEACHER  = "http://localhost:8080/api/teacher";
export const TeacherService ={

    getAllTeachers:async()=>{
        try {
            const data = await axios.get(API_URL_TEACHER);
            return data.data;
        } catch (error) {
            console.log("Error when fetching teachers",error);
        }
    }


}