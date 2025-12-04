import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

import "../styles/OrderSuccess.css";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId, amount } = location.state || {};

  const handleOrdersClick = () => navigate("/orders");
  const handleHomeClick = () => navigate("/");

  return (
    <>
      <NavBar />
      <div className="order-success-container">
        <div className="order-success-card">
          <div className="order-success-icon">
            <span>✓</span>
          </div>
          <h2>Order Confirmed!</h2>
          <p className="order-success-subtitle">
            We’ve emailed you the receipt and delivery details.
          </p>

          {orderId && (
            <div className="order-success-meta">
              <p>
                <strong>Order ID:</strong> {orderId}
              </p>
              <p>
                <strong>Total:</strong> ₹{amount}
              </p>
            </div>
          )}

          <p className="order-success-hint">
            Track your purchase from the orders page or continue browsing for more
            styles.
          </p>

          <div className="order-success-actions">
            <button onClick={handleOrdersClick}>View Orders</button>
            <button onClick={handleHomeClick} className="secondary">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;

