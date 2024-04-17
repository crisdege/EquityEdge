// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Box,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import Logo from "./Images/Logo.png";
// import { useNavigate } from "react-router-dom";

// import LoginForm from "./UserComponents/LoginForm";
// import RegisterForm from "./UserComponents/RegisterForm";

// const NavigationBar = ({
//   isLoggedIn,
//   onLogin,
//   onLogout,
//   userID,
//   userFullName,
// }) => {
//   const navigate = useNavigate();
//   const [loginDialogOpen, setLoginDialogOpen] = useState(false);
//   const [registerDialogOpen, setRegisterDialogOpen] = useState(false);

//   const handleLogout = () => {
//     onLogout();
//     navigate("/");
//   };

//   const handleLoginDialogOpen = () => {
//     setLoginDialogOpen(true);
//   };

//   const handleLoginDialogClose = () => {
//     setLoginDialogOpen(false);
//   };

//   const handleRegisterDialogOpen = () => {
//     setRegisterDialogOpen(true);
//   };

//   const handleRegisterDialogClose = () => {
//     setRegisterDialogOpen(false);
//   };

//   return (
//     <>
//       <AppBar position="static" sx={{ backgroundColor: "#FFF8F3", height: 64 }}>
//         <Toolbar>
//           <Box display="flex" alignItems="center">
//             <Link to="/">
//               <img
//                 src={Logo}
//                 alt="Logo"
//                 style={{
//                   height: "64px",
//                   marginRight: "10px",
//                   cursor: "pointer",
//                 }}
//               />
//             </Link>
//           </Box>
//           <Box
//             display="flex"
//             alignItems="center"
//             justifyContent="flex-end"
//             flexGrow={1}
//           >
//             {isLoggedIn ? (
//               <Typography
//                 variant="subtitle1"
//                 sx={{
//                   textDecoration: "underline",
//                   cursor: "pointer",
//                   display: "flex",
//                   color: "black",
//                 }}
//                 onClick={handleLogout}
//               >
//                 Log Out
//               </Typography>
//             ) : (
//               <>
//                 <Button
//                   color="inherit"
//                   onClick={handleRegisterDialogOpen}
//                   sx={{ color: "black" }}
//                 >
//                   Register
//                 </Button>
//                 <Button
//                   color="inherit"
//                   onClick={handleLoginDialogOpen}
//                   sx={{ color: "black" }}
//                 >
//                   Login
//                 </Button>
//               </>
//             )}
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <Dialog open={loginDialogOpen} onClose={handleLoginDialogClose}>
//         <DialogTitle>Login</DialogTitle>
//         <DialogContent>
//           <LoginForm
//             onLogin={(token, user) => {
//               onLogin(token, user);
//               handleLoginDialogClose();
//             }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleLoginDialogClose}>Close</Button>
//         </DialogActions>
//       </Dialog>
//       <Dialog open={registerDialogOpen} onClose={handleRegisterDialogClose}>
//         <DialogTitle>Register</DialogTitle>
//         <DialogContent>
//           <RegisterForm />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleRegisterDialogClose}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default NavigationBar;
// NavigationBar.js

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

const NavigationBar = ({ isLoggedIn, onLogin, onLogout }) => {
  const navigate = useNavigate();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [registrationSuccessOpen, setRegistrationSuccessOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
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

  const handleRegistrationSuccessClose = () => {
    setRegistrationSuccessOpen(false);
    setRegisterDialogOpen(false); // Close the registration form as well
  };

  const handleRegister = (username, password) => {
    // Automatically log in the user after successful registration
    onLogin(username, password);
    // Close the registration dialog
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
          <LoginForm
            onLogin={(token, user) => {
              onLogin(token, user);
              handleLoginDialogClose();
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLoginDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={registerDialogOpen} onClose={handleRegisterDialogClose}>
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          <RegisterForm onRegister={handleRegister} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRegisterDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NavigationBar;
