import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { allUsers, updateUserDetails } from '../redux/authSlice'; 
import './UserDetailsPage.css';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';

interface UserEditableDetail {
  email: string;
  role: "Admin" | "User";
  firstName: string;
  lastName: string;
  bio: string;
  profilePicture: string;
  lastLogin: string;
}

export const UserDetailsPage: React.FC = () => {
  const { userEmail } = useParams<{ userEmail: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentRole = useSelector((state: RootState) => state.auth.role);
  const canEdit = currentRole === "Admin";
  const initialUser = allUsers.find(user => user.email === userEmail);

  const [user, setUser] = useState<UserEditableDetail | null>(() => {
    if (initialUser) {
      return {
        email: initialUser.email,
        role: initialUser.role as "Admin" | "User",
        firstName: initialUser.firstName,
        lastName: initialUser.lastName,
        bio: initialUser.bio,
        profilePicture: initialUser.profilePicture,
        lastLogin: initialUser.lastLogin
      };
    }
    return null;
  });

  if (!user) {
    return <div>User not found.</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUser(prevUser => (prevUser ? { ...prevUser, [name]: value } : null));
  };

  const handleSave = () => {
    if (user && userEmail) {
      console.log("Saving changes:", user);
      dispatch(updateUserDetails({ 
        email: userEmail, 
        updatedDetails: user 
      }));
      
      alert("User details updated successfully!");
      
      navigate('/movie/profile');
    }
  };

  return (
    <div className="user-details-page-container">
      <h1 className="user-details-title">User Profile: {user.firstName} {user.lastName}</h1>

      {canEdit ? (
        <form className="user-details-form">
          <label>
            First Name:
            <input type="text" name="firstName" value={user.firstName} onChange={handleChange} />
          </label>
          <label>
            Last Name:
            <input type="text" name="lastName" value={user.lastName} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={user.email} onChange={handleChange} disabled />
          </label>
          <label>
            Bio:
            <textarea name="bio" value={user.bio} onChange={handleChange} />
          </label>
          <div className="button-group">
            <button type="button" onClick={handleSave}>Save Changes</button>
            <button type="button" onClick={() => navigate('/movie/profile')}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className="user-details-readonly">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Bio:</strong> {user.bio}</p>
          <p><strong>Last Login:</strong> {user.lastLogin}</p>
          <button type="button" onClick={() => navigate('/movie')}>Go Back</button>
        </div>
      )}
    </div>
  );
};