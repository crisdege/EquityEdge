// NavigationBar.js
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from react-router-dom if you are using it for navigation
import LoginForm from "./UserComponents/LoginForm";
import RegisterForm from "./UserComponents/RegisterForm";
// import logo from './Images/Logo.png'
import Logo from "./Images/Logo.png";

import { useNavigate } from "react-router-dom";

import CustomDialog from "./UserComponents/CustomDialog";
import StockMarket from "./UserComponents/StockMarket";

const NavigationBar = ({ isLoggedIn, onLogout, userID, userFullName }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const [dialogTitle, setDialogTitle] = useState("");
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    setDialogTitle("Register");
    setDialogContent(<RegisterForm onClose={() => setOpenDialog(false)} />);
    setOpenDialog(true);
  };

  const handleLoginClick = () => {
    setDialogTitle("Login");
    setDialogContent(<LoginForm onClose={() => setOpenDialog(false)} />);
    setOpenDialog(true);
  };

  const handleStockMarketClick = () => {
    navigate("/trade-stocks");
  };

  const handleLogout = () => {
    // Implement logout logic here (e.g., clear user session, etc.)
    // After logout, navigate to the authentication page
    navigate("/");
  };
  return (
    <AppBar position="static" sx={{ backgroundColor: "#FFF8F3", height: 64 }}>
      <Toolbar>
        <Box display="flex" alignItems="center">
          <img
            src={Logo}
            alt="Logo"
            style={{ height: "64px", marginRight: "10px" }}
          />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          flexGrow={1}
        >
          {isLoggedIn ? (
            <>
              <Typography
                variant="subtitle1"
                sx={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  display: "flex",
                  color: "black",
                }}
              >
                <Box marginRight={2}>Add/Withdraw Cash</Box>
                <Button
                  color="inherit"
                  onClick={handleStockMarketClick}
                  sx={{ color: "black" }}
                >
                  Buy Stocks
                </Button>
                <Box
                  marginRight={2}
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                >
                  Log Out
                </Box>
              </Typography>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={handleRegisterClick}
                sx={{ color: "black" }}
              >
                Register
              </Button>
              <Button
                color="inherit"
                onClick={handleLoginClick}
                sx={{ color: "black" }}
              >
                Login
              </Button>
            </>
          )}
        </Box>
      </Toolbar>

      <CustomDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title={dialogTitle}
      >
        {dialogContent}
      </CustomDialog>
    </AppBar>
  );
};

export default NavigationBar;
