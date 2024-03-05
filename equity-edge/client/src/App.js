import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import Dashboard from "./UserComponents/Dashboard";
import NavigationBar from "./NavigationBar";
import StockMarket from "./UserComponents/StockMarket";

const App = () => {
  // For demonstration purposes, assuming the user is authenticated and userId is known
  const userId = "123";
  const userFullName = "Cristina Dege";
  // const userId = null;
  // const userFullName = null;

  const [isLoggedIn, setIsLoggedIn] = useState(true);

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
            userId ? (
              <Dashboard userId={userId} userFullName={userFullName} />
            ) : (
              <HomePage />
            )
          }
        />
        <Route path="/trade-stocks" element={<StockMarket />} />
      </Routes>
    </Router>
  );
};

export default App;
