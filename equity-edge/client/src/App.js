
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './AuthPage';
import Dashboard from './UserComponents/Dashboard';

const App = () => {
  // For demonstration purposes, assuming the user is authenticated and userId is known
  const userId = '123';
  const userFullName = 'Cristina Dege';
  // const userId = null;
  // const userFullName = null;

  return (
    <Router>
      <Routes>
      <Route path="/" element={userId ? <Dashboard userId={userId} userFullName={userFullName} /> : <AuthPage />} />
      </Routes>
    </Router>
  );
};

export default App;

