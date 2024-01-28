import React, { useState } from 'react';

import RegisterForm from './UserFunctions/RegisterForm';
import LoginForm from './UserFunctions/LoginForm';

const WelcomePage = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false);
  };

  const handleLoginClick = () => {
    setShowRegisterForm(false);
    setShowLoginForm(true);
  };

  return (
    <div>
      <h1>Welcome to EquityEdge</h1>
      
      {!showRegisterForm && !showLoginForm && (
        <div>
          <p>Register or login to access the stock trading system.</p>
          <button onClick={handleRegisterClick}>Register</button>
          <button onClick={handleLoginClick}>Login</button>
        </div>
      )}

      {showRegisterForm && (
        <div>
          <h2>Register</h2>
          <RegisterForm />
          <p>Already have an account? <button onClick={() => setShowRegisterForm(false)}>Go to Login</button></p>
        </div>
      )}

      {showLoginForm && (
        <div>
          <h2>Login</h2>
          <LoginForm />
          <p>Don't have an account? <button onClick={() => setShowLoginForm(false)}>Go to Register</button></p>
        </div>
      )}
    </div>
  );
};

export default WelcomePage;
