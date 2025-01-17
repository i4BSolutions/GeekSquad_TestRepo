"use client";
import React, { useEffect, useState } from "react";
import "./dashboard.css";
import Cart from "../cart/page";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);


function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
     const { data, error } = await supabase.from("Users").select();
     //console.log("Supabase Data:", data);

      if (error) console.error("Error fetching users:", error);
      setUsers(data || []);
    };
    fetchUsers();
  }, []);

  return <pre>{JSON.stringify(users,null,2)}</pre>;
}


export default function DashboardPage() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [user, setUser] = useState(null);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const products = [
    { id: 1, name: "Product A", price: 0 },
    { id: 2, name: "Product B", price: 0 },
    { id: 3, name: "Product C", price: 0 },
    { id: 4, name: "Product D", price: 0 },
    { id: 5, name: "Product E", price: 0 },
    { id: 6, name: "Product F", price: 0 },
    { id: 7, name: "Product G", price: 0 },
    { id: 8, name: "Product H", price: 0 },
  ];

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Fetch user data and set welcome message
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/login", {
          method: "GET",
          credentials: "include", // Include cookies for authentication
        });

        if (response.ok) {
          const data = await response.json();
          console.log("User data from loginAPI :", data);
          setUser(data); // Save user data
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  // Show alert when user data is updated
  useEffect(() => {
    if (user?.email) {
      console.log("About to call alert...");
      alert(`Welcome to the Dashboard, ${user.email}!`);
    }
  }, [user]); // Dependency on `user`

  return (
    <div>
      {!showCart && (
        <div className="dashboard">
          <header className="header">
            <div className="logo-circle"></div>
            <h1>Home</h1>
            <div className="cart">
              <span role="img" aria-label="cart" onClick={toggleCart}>
                🛒
              </span>
              <span data-testid="cart-count" className="cart-count">{cart.length}</span>
            </div>
          </header>
          <main className="products-container">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image"></div>
                <h3>{product.name}</h3>
                <p>${product.price.toFixed(2)}</p>
                <button 
                  data-testid="add-to-cart"
                  className="add-to-cart"
                  onClick={() => addToCart(product)}
                >
                  ADD TO CART
                </button>
              </div>
            ))}
          </main>
          <h1>Users</h1>
          <Users/>
        </div>
      )}
      {showCart && (
        <Cart cart={cart} setCart={setCart} toggleCart={toggleCart} />
      )}
    </div>
  );
}
