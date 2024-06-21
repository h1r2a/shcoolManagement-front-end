import React, { useState } from 'react';
import "./sidebar.css";
import { adminRoutes } from '../../pages/routes/routes';
import { FaUser } from 'react-icons/fa';

const Sidebar = ({ onRouteChange }) => {
  const [activeRoute, setActiveRoute] = useState('/main'); // Défaut: route 'Main'

  const handleClick = (route) => {
    setActiveRoute(route); // Met à jour l'état avec le chemin cliqué
    onRouteChange(route); // Appelle la fonction de changement de route (si nécessaire)
  };

  return (
    <div className="sidebar">
      <div className="profile">
        <div className="profile-icon">
          <FaUser size={50} />
        </div>
      </div>
      <div className="links">
        <div className="link-ct">
          <ul>
            {adminRoutes.map((link, index) => (
              <li key={index}>
                
                <a
                  href="#a"
                  onClick={() => handleClick(link.path)}
                  className={link.path === activeRoute ? 'active' : ''}
                >
                  {link.routeName}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
