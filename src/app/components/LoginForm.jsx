'use client';
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { validateLoginForm } from "../auth/validation";



export default function AuthFormComponent() {
 const [formData,setFormData] = useState({
   email: '',
   password: ''});

   const [serverError, setServerError] = useState(null);
      const [errors, setErrors] = useState({
    email: "",
    password: "",
  })
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    const { isValid, errors: validationErrors } = validateLoginForm(formData);
    if (!isValid) {
      setErrors(validationErrors); // Update validation errors
      return;
    }

    // Clear errors if validation passes
    setErrors({ email: "", password: "" });

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Ensure cookies are sent
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        window.location.href = "/dashboard"; // Redirect to dashboard
      } else {
        const errorData = await response.json();
        console.log("Error response from server:", errorData.error?.includes("password"));
      

        // Assign server error to the appropriate field or general error
        if (errorData.error?.includes("email")) {
          setErrors({ email: errorData.error, password: "" });
        } else if (errorData.error?.includes("password")) {
          setErrors({ email: "", password: errorData.error });
        } else {
          setErrors({ email: "", password: "" });
        }
      }
    } catch (err) {
      console.error("Fetch error:", err.message || err);
      setErrors({
        email: "",
        password: "An unexpected error occurred. Please try again.",
      });
    }
  };


  return (
    <Box
     
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        backgroundColor: "white" // Optional background color
      }}
    >
      <Box
        component="form"
        sx={{
          width: "100%",
          maxWidth: "400px", 
          backgroundColor: "white", 
          padding: 4,
          lineSpacing: 2
        }}
        noValidate
        autoComplete="off"
      >
        <div style={{ textAlign: "center",lineHeight: "50px",fontWeight:"bold" }}>
          <h1>Login</h1>
          <p>Enter your email and password to login</p>
        </div>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={(e)=>setFormData({...formData,email:e.target.value})}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={formData.password}
          onChange={(e)=> setFormData({...formData,password:e.target.value})}
          error={!!errors.password }
          helperText={errors.password}
        />
         
        <Button type="submit" fullWidth variant="contained" sx={{marginTop:2}}
        onClick={handleSubmit}>
            Login</Button>
       {serverError && (
          <p style={{ textAlign: "center", marginTop: "16px",color:"#1E88E5" }}>
          Forgot password? <a href="#">Reset here</a>
        </p>
       )}
       
      </Box>
    </Box>
  );
}
