import React, { useState } from "react";
import "./mainPage.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Content from "../../components/Content/Content";
import Course from "../../components/Admin/Course/Course";
import Student from "../../components/Admin/Students/Student";
import Teacher from "../../components/Admin/Teacher/Teacher";

const MainPage = () => {
  const [activeRoute, setActiveRoute] = useState("/main"); // Route par défaut

  const handleRouteChange = (route) => {
    setActiveRoute(route);
  };

  let mainContent = null;

  switch (activeRoute) {
    case "/main":
      mainContent = <Content />;
      break;
    case "/course":
      mainContent = <Course />;
      break;
      case "/student":
        mainContent = <Student/>;
        break;
        case "/teacher":
          mainContent = <Teacher/>;
          break;
    default:
      mainContent = <Content />;
      break;
  }

  return (
    <div className="mainPage">
      <Header />
      <Sidebar onRouteChange={handleRouteChange} />
      <div className="mainContent">{mainContent}</div>
    </div>
  );
};

export default MainPage;
