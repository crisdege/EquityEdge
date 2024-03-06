import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "./Images/Logo.png";
import { useNavigate } from "react-router-dom";

const NavigationBar = ({ isLoggedIn, onLogout, userID, userFullName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#FFF8F3", height: 64 }}>
      <Toolbar>
        <Box display="flex" alignItems="center">
          <Link to="/">
            <img
              src={Logo}
              alt="Logo"
              style={{ height: "64px", marginRight: "10px", cursor: "pointer" }}
            />
          </Link>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          flexGrow={1}
        >
          {isLoggedIn ? (
            <Typography
              variant="subtitle1"
              sx={{
                textDecoration: "underline",
                cursor: "pointer",
                display: "flex",
                color: "black",
              }}
              onClick={handleLogout}
            >
              Log Out
            </Typography>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/register"
                sx={{ color: "black" }}
              >
                Register
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{ color: "black" }}
              >
                Login
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
