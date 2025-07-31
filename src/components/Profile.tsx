import React from 'react';
import { allUsers } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

export const Profile: React.FC = () => {
  const userProfiles = allUsers.filter(user => user.role === "User");
  const navigate = useNavigate();

  const handleUserCardClick = (userEmail: string) => {
    navigate(`/user-details/${userEmail}`);
  };

  return (
    <div className="profile-page-container">
      <h1 className="profile-page-title">User Profiles</h1>
      <div className="user-cards-grid">
        {userProfiles.map((user) => (
          <div
            key={user.email}
            className="user-card user-card--clickable"
            onClick={() => handleUserCardClick(user.email)}
          >
            <img src={user.profilePicture} alt={`${user.firstName} ${user.lastName}'s profile`} className="user-profile-pic" />
            <h2 className="user-name">{user.firstName} {user.lastName}</h2>
            <p className="user-email">Email: {user.email}</p>
            <p className="user-bio">{user.bio}</p>
            <p className="user-last-login">Last Login: {user.lastLogin}</p>
          </div>
        ))}
      </div>
    </div>
  );
};