import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import type { RootState } from '../redux/store'; //Overall shape of redux store state
import "./Header.css";

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const userRole = useSelector((state: RootState) => state.auth.role);
  const userEmail = useSelector((state: RootState) => state.auth.email);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const profilePath = userRole === "User" ? `/user-details/${userEmail}` : "/movie/profile";

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-links-container">
          <NavLink to="/movie" className="nav-link" end>
            Movie
          </NavLink>

          {isLoggedIn && (
            <NavLink to={profilePath} className="nav-link">
              Profile
            </NavLink>
          )}
        </div>
        <div className="header-actions">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="logout-button">
              Log Out
            </button>
          ) : (
            <NavLink to="/" className="login-button">
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};