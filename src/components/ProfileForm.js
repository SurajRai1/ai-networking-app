import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileForm = () => {
  const navigate = useNavigate();

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Handle profile form submission
    navigate('/home'); // Redirect to homepage after profile is completed
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Complete Your Profile</h2>
        <form onSubmit={handleProfileSubmit}>
          <input type="text" placeholder="Education" required />
          <input type="text" placeholder="Interests" required />
          <input type="text" placeholder="Skills" required />
          <input type="text" placeholder="Goals" required />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
