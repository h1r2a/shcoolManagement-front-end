import { createContext, useState } from "react";

export const courseContext= createContext();
export const CourseProvider = ({children})=>{
    const [courses,setCourses] = useState([]);
    return(
        <courseContext.Provider value={{courses,setCourses}}>
            {children}
        </courseContext.Provider>
    )
}
