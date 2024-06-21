import React from "react";
import "./header.css";
import { GiBrain } from "react-icons/gi";
const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        {" "}
        <GiBrain size={30} className="brain" /> <h1> MATHISI</h1>
      </div>
    </div>
  );
};

export default Header;
