'use client';
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";



export default function AuthFormComponent() {
 const [formData,setFormData] = useState({
   email: '',
   password: ''});
    
  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Form Data:", formData);

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Ensure cookies are sent
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      window.location.href = "/dashboard"; // Explicitly redirect
    } else {
      const errorData = await response.json();
      console.error("Error response from server:", errorData.error || "Unknown error");
    }
  } catch (err) {
    console.error("Fetch error:", err.message || err);
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
        <div style={{ textAlign: "center" }}>
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
        />
        <Button type="submit" fullWidth variant="contained" sx={{marginTop:2}}
        onClick={handleSubmit}>
            Login</Button>
       
        <p style={{ textAlign: "center", marginTop: "16px" }}>
          Forgot your password? <a href="#">Reset it here</a>
        </p>
      </Box>
    </Box>
  );
}
