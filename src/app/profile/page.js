"use client";
import React, { useEffect, useState } from "react";
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
import  SuccessBar  from "./components/successBar";
import FailBar from "./components/failBar";
import { redirect } from "next/navigation";
import { useUser } from "../context/UserContext";




export default function ProfilePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

 const { user } = useUser();
 console.log("User : ", user)

  const [isEditable, setIsEditable] = useState(false);
  const [openSuccessBar, setOpenSuccessBar] = useState(false);
  const [closeSuccessBar, setCloseSuccessBar] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Loading...",
    email: "loading...",
    phoneNumber: "loading..",
    address: "loading...",
  });


useEffect(() => {
  if (user) {
    setFormData({
      fullName: user.fullName || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      address: user.address || "",
    });
  }
}, [user]);
    const [errors, setErrors] = useState({});


  const handleEdit = () => {
    setIsEditable(true);
    
  };


const SaveChanges = async (validatedData) => {
  try {
    const response = await fetch("/api/profile/updateProfile", {
      method: "PUT",
      body: JSON.stringify(validatedData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      // Show success message
    setOpenSuccessBar(true);
    } else {
      // Show error message
      setCloseSuccessBar(true);
    }
  } catch (error) {
    console.log("Error: ", error);
    setErrors(error.formErrors?.fieldErrors || {});
  }
};


  const handleSave =async () => {
    try{
       const validatedData= ProfileFormSchema.parse({
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
      });
    setIsEditable(false);
  
    await SaveChanges({validatedData});
   
     

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
        <IconButton aria-label="close" onClick={()=> redirect("/dashboard")}>
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

        <FailBar
          open={closeSuccessBar}
          handleClose={() => {
            setCloseSuccessBar(false);
          }}
        />
        <SuccessBar
          open={openSuccessBar}
          handleClose={() => {
            setOpenSuccessBar(false);
          }}
        />
      </Box>
    </Container>
  );
  }


