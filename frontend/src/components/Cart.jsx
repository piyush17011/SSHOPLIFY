/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../auth/AuthContext";
import '../styles/Cart.css';

export default function Cart() {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = user?._doc?._id;

  // ✅ WRAP FETCH IN useCallback TO FIX ESLINT
  const fetchCart = useCallback(async () => {
    try {
      const res = await axios.get(
        `https://sshoplify.onrender.com/api/cart/${userId}`
      );
      setCart(res.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);  // dependency OK

  useEffect(() => {
    if (userId) fetchCart();
  }, [userId, fetchCart]);  // ESLint satisfied

  // Update quantity
  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      await axios.put(`https://sshoplify.onrender.com/api/cart/update`, {
        userId,
        productId,
        quantity,
      });

      fetchCart();
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  // Remove Item
  const handleRemove = async (productId) => {
    try {
      await axios.delete(`https://sshoplify.onrender.com/api/cart/remove`, {
        data: { userId, productId },
      });

      fetchCart();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  if (loading) return <div className="text-center p-4 fs-4">Loading...</div>;

  if (!cart || cart.items.length === 0)
    return (
      <>
        <NavBar />
        <div className="text-center p-5 fs-3">Your cart is empty</div>
      </>
    );

  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <>
      <NavBar />

      <div className="container mt-4">
        <h2 className="text-center mb-4">Your Cart</h2>

        {cart.items.map((item) => (
          <Card className="cart-card mb-3" key={item._id}>
            <div className="d-flex p-3 justify-content-between align-items-center">

              <div className="d-flex align-items-center">
                <img
                  src={item.productId.imageURL}
                  className="cart-img"
                  alt=""
                />

                <div className="ms-3">
                  <h5 className="cart-title">{item.productId.title}</h5>
                  <p className="text-muted mb-0">₹{item.productId.price}</p>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <Button
                  variant="secondary"
                  className="quantity-btn"
                  onClick={() =>
                    handleQuantityChange(item.productId._id, item.quantity - 1)
                  }
                >
                  -
                </Button>

                <span className="mx-3">{item.quantity}</span>

                <Button
                  variant="secondary"
                  className="quantity-btn"
                  onClick={() =>
                    handleQuantityChange(item.productId._id, item.quantity + 1)
                  }
                >
                  +
                </Button>

                <Button
                  variant="danger"
                  className="ms-4 remove-btn"
                  onClick={() => handleRemove(item.productId._id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          </Card>
        ))}

        <Card className="total-card p-3 mt-4">
          <h4 className="text-end">Total: ₹{totalPrice}</h4>
        </Card>

      </div>
    </>
  );
}
