import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { FaBook, FaUserGraduate, FaPlus } from "react-icons/fa"; // Import des icônes depuis react-icons
import "react-tabs/style/react-tabs.css"; // Styles par défaut pour les onglets
import "./course.css";
import Allcourse from "./Allcourse";
import CourseStudent from "./CourseStudent";
import { CourseProvider } from "./coursContext";
import NewCourse from "./NewCourse";

const Course = () => {
  return (
    <CourseProvider>
      <div className="coursPage">
        <Tabs>
          <TabList>
            <Tab>
              <FaBook /> All courses
            </Tab>
            <Tab>
              <FaUserGraduate /> Courses & Students
            </Tab>
            <Tab>
              <FaPlus /> New Course
            </Tab>
          </TabList>

          <TabPanel>
            <Allcourse />
          </TabPanel>
          <TabPanel>
            <CourseStudent />
          </TabPanel>
          <TabPanel>
          <NewCourse /> 
          </TabPanel>
        </Tabs>
      </div>
    </CourseProvider>
  );
};

export default Course;
