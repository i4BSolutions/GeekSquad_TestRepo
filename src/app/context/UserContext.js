"use client"
import { createContext, useState, useEffect, useContext } from "react";

// Create the user context
const UserContext = createContext(null);

// Provider component to wrap around the application
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data once after login
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/login");
        if (response.ok) {
          const data = await response.json();
          setUser(data); // Store user data in context
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } 
    };

    // Fetch user data only if it's not already available
    if (!user) {
      fetchUserData();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => useContext(UserContext);
