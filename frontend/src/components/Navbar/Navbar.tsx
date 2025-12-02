import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-links active" : "nav-links"
              }
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/idea-breakdown"
              className={({ isActive }) =>
                isActive ? "nav-links active" : "nav-links"
              }
            >
              Infrastructuur genereren
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/product"
              className={({ isActive }) =>
                isActive ? "nav-links active" : "nav-links"
              }
            >
              Over dit project
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
