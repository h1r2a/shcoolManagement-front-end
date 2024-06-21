import React from "react";
import { FaBook, FaUserGraduate, FaPlus } from "react-icons/fa";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "./student.css";
import AllStudents from "./AllStudents";
const Student = () => {
  return (
    <div className="studentPage">
      <Tabs>
        <TabList>
          <Tab>
            {" "}
            <FaUserGraduate /> All Students
          </Tab>
          <Tab>
            <FaBook />
            Students & Courses
          </Tab>
          <Tab>
            {" "}
            <FaPlus /> New Student
          </Tab>
        </TabList>
        <TabPanel>
          <AllStudents/>
        </TabPanel>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
      </Tabs>
    </div>
  );
};

export default Student;
