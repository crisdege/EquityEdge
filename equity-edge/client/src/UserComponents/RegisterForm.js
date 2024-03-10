import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const RegisterForm = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        onRegister(data);
      } else {
        alert(data.message); // Display error message if registration fails
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Full Name"
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
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
        label="Email"
        type="email"
        name="email"
        value={formData.email}
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
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
