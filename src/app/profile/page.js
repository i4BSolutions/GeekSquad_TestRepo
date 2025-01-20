"use client";
import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { ProfileFormSchema } from "../utils/errordefinition";


export default function ProfilePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Mg Mg",
    email: "mgmg@domain.com",
    phoneNumber: "09123456789",
    address: "11th Street, Between 72&73 Streets",
  });
    const [errors, setErrors] = useState({});

  const handleEdit = () => {
    setIsEditable(true);
    
  };

  const handleSave = () => {
    try{
        ProfileFormSchema.parse({
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
      });
    setIsEditable(false);
    alert("Profile updated successfully!");
    setErrors({});
    }
    catch(error){
        setErrors(error.formErrors.fieldErrors);
      
  };
}

  const handleChange = (e) => {
  
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container maxWidth="lg" sx={{}}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          textAlign: "center",
          py: 2, // Padding for better spacing
        }}
      >
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Typography variant="h4" fontWeight="bold">
            Profile
          </Typography>
        </Box>
        <IconButton aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ width: "100%", borderColor: "rgba(0,0,0,0.2)" }} />
      <Box
        maxWidth="sm"
        sx={{
          mt: 10,
          mx: "auto",
          p: 2,
        }}
      >
        <TextField
          name="fullName"
          label="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          fullWidth
          disabled={!isEditable}
          sx={{ my: 2 }}
          error={errors.fullName}
          helperText={errors.fullName}
        />
        <TextField
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          disabled
          sx={{ my: 2 }}
        />
        <TextField
          name="phoneNumber"
          label="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          fullWidth
          disabled={!isEditable}
          sx={{ my: 2 }}
          error={errors.phoneNumber}
          helperText={errors.phoneNumber}
        />
        <TextField
          name="address"
          label="Address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          disabled={!isEditable}
          sx={{ my: 2 }}
            error={errors.address}
            helperText={errors.address}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: "#E0E0E0",
              color: "#000000",
              maxwidth: "200px",
            }}
            disabled={isEditable}
            onClick={handleEdit}
          >
            Edit Profile
          </Button>

          <Button
            variant="contained"
            fullWidth
            disabled={!isEditable}
            sx={{ flex: 1 }}
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Container>
  );
  }

