import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignInSignUp.css';

const SignIn = () => {
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    // Handle authentication here
    navigate('/home'); // Redirect to homepage after successful login
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleSignIn}>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <p className="forgot-password">Forgot password?</p>
          <button type="submit">Login</button>
          <p>Don't have an account? <a href="/signup">Signup</a></p>
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

export default SignIn;
