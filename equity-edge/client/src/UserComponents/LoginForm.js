// import React, { useState } from "react";
// import { TextField, Button } from "@mui/material";

// const LoginForm = ({ onLogin, history }) => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   // LoginForm.js
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("/api/user/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         const errorMessage = await response.text();
//         throw new Error(errorMessage || "Login failed");
//       }

//       const { token, user } = await response.json();
//       // Pass token to parent component
//       onLogin(token, user);
//       console.log(user);
//       // Redirect to the dashboard page
//       history.push("/dashboard"); // Assuming '/dashboard' is the desired route after login
//     } catch (error) {
//       console.error("Login failed:", error.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <TextField
//         label="Username"
//         type="text"
//         name="username"
//         value={formData.username}
//         onChange={handleChange}
//         required
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         label="Password"
//         type="password"
//         name="password"
//         value={formData.password}
//         onChange={handleChange}
//         required
//         fullWidth
//         margin="normal"
//       />
//       <Button type="submit" variant="contained" color="primary">
//         Login
//       </Button>
//     </form>
//   );
// };

// export default LoginForm;
import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const LoginForm = ({ onLogin, history }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Login failed");
      }

      const { token, user } = await response.json();
      // Pass token to parent component
      onLogin(token, user);
      // Redirect to the dashboard page
      history.push("/dashboard"); // Assuming '/dashboard' is the desired route after login
    } catch (error) {
      console.error("Login failed:", error.message);
      setErrorMessage("Incorrect username or password. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
      {errorMessage && (
        <Typography variant="body2" color="error">
          {errorMessage}
        </Typography>
      )}
    </div>
  );
};

export default LoginForm;
