import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "./Images/Logo.png";
import { useNavigate } from "react-router-dom";

import LoginForm from "./UserComponents/LoginForm";
import RegisterForm from "./UserComponents/RegisterForm";

const NavigationBar = ({ isLoggedIn, onLogout, userID, userFullName }) => {
  const navigate = useNavigate();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);

  const handleLogout = () => {
    navigate("/");
  };

  const handleLoginDialogOpen = () => {
    setLoginDialogOpen(true);
  };

  const handleLoginDialogClose = () => {
    setLoginDialogOpen(false);
  };

  const handleRegisterDialogOpen = () => {
    setRegisterDialogOpen(true);
  };

  const handleRegisterDialogClose = () => {
    setRegisterDialogOpen(false);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#FFF8F3", height: 64 }}>
        <Toolbar>
          <Box display="flex" alignItems="center">
            <Link to="/">
              <img
                src={Logo}
                alt="Logo"
                style={{
                  height: "64px",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
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
                  onClick={handleRegisterDialogOpen}
                  sx={{ color: "black" }}
                >
                  Register
                </Button>
                <Button
                  color="inherit"
                  onClick={handleLoginDialogOpen}
                  sx={{ color: "black" }}
                >
                  Login
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Dialog open={loginDialogOpen} onClose={handleLoginDialogClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <LoginForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLoginDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={registerDialogOpen} onClose={handleRegisterDialogClose}>
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          <RegisterForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRegisterDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NavigationBar;
