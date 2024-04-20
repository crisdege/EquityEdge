import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import Dashboard from "./UserComponents/Dashboard";
import NavigationBar from "./NavigationBar";
import StockMarket from "./UserComponents/StockMarket";
import AdminDashboard from "./AdminComponents/AdminDashboard";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const handleLogin = async (token, userData) => {
    console.log("i am here");
    try {
      setIsLoggedIn(true); // Set isLoggedIn to true after successful login
      setUserInfo(userData); // Update user info state with retrieved data
      console.log(userData);
      // Store token in localStorage or sessionStorage
      localStorage.setItem("token", token); // Or use sessionStorage if preferred
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const handleLogout = () => {
    // Perform logout actions
    setIsLoggedIn(false);
    // Clear token from localStorage or sessionStorage
    localStorage.removeItem("token"); // Or use sessionStorage if preferred
  };

  console.log(userInfo);

  return (
    <Router>
      <NavigationBar
        onLogin={handleLogin}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              userInfo.isAdmin ? (
                <AdminDashboard
                  userID={userInfo._id}
                  userFullName={userInfo.fullName}
                />
              ) : (
                <Dashboard
                  userID={userInfo._id}
                  userFullName={userInfo.fullName}
                />
              )
            ) : (
              <HomePage
                onLogin={(token, userData) => handleLogin(token, userData)}
              />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
