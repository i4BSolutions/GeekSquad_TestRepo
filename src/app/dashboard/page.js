"use client";
import React, { useEffect, useState } from "react";
import "./dashboard.css";
import Cart from "../cart/page";

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
          setUser(data); // Save user data
          if (data?.email) {
            alert(`Welcome to the Dashboard, ${data.email}!`);
          }
         
        } else {
          console.error("Failed to fetch user data");
          setWelcomeMsg("Welcome to the Dashboard!");
        }
        // Show message for 3 seconds
        setShowWelcome(true);
        setTimeout(() => {
          setShowWelcome(false);
        }, 3000);
      } catch (error) {
        console.error("Error fetching user:", error);
        setWelcomeMsg("Welcome to the Dashboard!");
      }
    };
    fetchUser();
  }, []);

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
              <span className="cart-count">{cart.length}</span>
            </div>
          </header>
          <main className="products-container">
           
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image"></div>
                <h3>{product.name}</h3>
                <p>${product.price.toFixed(2)}</p>
                <button
                  className="add-to-cart"
                  onClick={() => addToCart(product)}
                >
                  ADD TO CART
                </button>
              </div>
            ))}
          </main>
        </div>
      )}
      {showCart && (
        <Cart cart={cart} setCart={setCart} toggleCart={toggleCart} />
      )}
    </div>
  );
}
