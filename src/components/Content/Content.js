import React from 'react';
import "./content.css";
import { FaBook, FaUserGraduate, FaChalkboardTeacher, FaDollarSign, FaChartLine,FaUser } from 'react-icons/fa';



const Content = () => {
  const cardData = [
    { id: 'course', label: 'Courses', icon: <FaBook />, number: 120 },
    { id: 'student', label: 'Students', icon: <FaUserGraduate />, number: 350 },
    { id: 'teacher', label: 'Teachers', icon: <FaChalkboardTeacher />, number: 45 },
    { id: 'class', label: 'Users', icon: <FaUser />, number: 495 },
    { id: 'total', label: 'Total Amount', icon: <FaDollarSign />, number: 50000 },
    { id: 'graph', label: 'Graph', icon: <FaChartLine />, number: 75 }
];
  return (
    <div className='content'>
      {cardData.map(card => (
        <div className="card" id={card.id} key={card.id}>
          <div className="card-icon">{card.icon}</div>
          {card.label}
          <div className="card-number">{card.number}</div>
        </div>
      ))}
    </div>
  );
};

export default Content;
