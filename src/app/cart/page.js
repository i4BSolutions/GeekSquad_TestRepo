"use client";
import React, { useState } from "react";
import "./cart.css";

const Cart = ({ cart, setCart }) => {
  const [quantity, setQuantity] = useState({});

  const handleQuantityChange = (id, qty) => {
    setQuantity((prev) => ({ ...prev, [id]: qty }));
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => {
    const qty = quantity[item.id] || 1;
    return sum + item.price * qty;
  }, 0);

  return (
    <div className="cart-page">
      <header className="cart-header">
        <h1>Cart</h1>
        <button className="close-cart" onClick={() => setCart([])}>
          ✖
        </button>
      </header>

      <div className="cart-content">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="product-details">
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
                <select
                  value={quantity[item.id] || 1}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                >
                  {[1, 2, 3, 4, 5].map((qty) => (
                    <option key={qty} value={qty}>
                      {qty}
                    </option>
                  ))}
                </select>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h3>Summary</h3>
          <p>Total: ${total.toFixed(2)}</p>
          <button
            className="checkout-btn"
            disabled={cart.length === 0}
            onClick={() => alert("Proceeding to Checkout...")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
