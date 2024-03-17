import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import Dashboard from "./UserComponents/Dashboard";
import NavigationBar from "./NavigationBar";
import StockMarket from "./UserComponents/StockMarket";
import AdminDashboard from "./AdminComponents/AdminDashboard";

const App = () => {
  // For demonstration purposes, assuming the user is authenticated and userId is known
  // const userId = "123";
  // const userFullName = "Cristina Dege";
  const isAdmin = false;
  // const userId = null;
  // const userFullName = null;
  const userId = "123";
  const userFullName = "Cristina Dege";
  // const isAdmin = true;

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    // Perform logout actions
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <NavigationBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            userId && !isAdmin ? (
              <Dashboard userId={userId} userFullName={userFullName} />
            ) : userId && isAdmin ? (
              <AdminDashboard userId={userId} userFullName={userFullName} />
            ) : (
              <HomePage />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
