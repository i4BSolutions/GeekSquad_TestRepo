'use client';
import React, {useEffect } from 'react';


export default function DashboardPage() {
    const [user, setUser] = React.useState(null);

    useEffect(()=>{
       const fetchUser = async ()=>{
         try {
            const response = await fetch("/api/auth/login", {
              method: "GET",
              credentials: "include", // Include cookies for authentication
            });
            const data = await response.json();
            console.log("From client:", data);
            setUser(data);
            
         } catch (error) {
            console.error('Error fetching user:', error);
            
         }
       }
       fetchUser();
    },[]);

    return (
      <div>
        <h1>Dashboard</h1>
        <p>Welcome to the dashboard page.</p>
        <h1> {user ? user.email : null}</h1>
      </div>
    );
}