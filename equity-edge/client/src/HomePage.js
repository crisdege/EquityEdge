import React, { useState } from "react";
import RegisterForm from "./UserComponents/RegisterForm";
import LoginForm from "./UserComponents/LoginForm";

const AuthPage = () => {
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

  const handleGoToLoginClick = () => {
    setShowRegisterForm(false);
    setShowLoginForm(true);
  };

  const handleGoToRegisterClick = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false);
  };

  return (
    <div>
      <div>
        <p>Register or login to access the stock trading system.</p>
        <button onClick={handleRegisterClick}>Register</button>
        <button onClick={handleLoginClick}>Login</button>
      </div>

      {showRegisterForm && (
        <div>
          <h2>Register</h2>
          <RegisterForm />
          <p>
            Already have an account?{" "}
            <button onClick={handleGoToLoginClick}>Go to Login</button>
          </p>
        </div>
      )}

      {showLoginForm && (
        <div>
          <h2>Login</h2>
          <LoginForm />
          <p>
            Don't have an account?{" "}
            <button onClick={handleGoToRegisterClick}>Go to Register</button>
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
