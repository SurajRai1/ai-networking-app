import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignInSignUp.css';

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    // Handle user sign up here
    navigate('/profile-form'); // Redirect to profile form after successful sign up
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Signup</h2>
        <form onSubmit={handleSignUp}>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Create password" required />
          <input type="password" placeholder="Confirm password" required />
          <button type="submit">Signup</button>
          <p>Already have an account? <a href="/signin">Login</a></p>
        </form>
        <div className="social-login">
          <p>Or</p>
          <button className="facebook-btn">Login with Facebook</button>
          <button className="google-btn">Login with Google</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
