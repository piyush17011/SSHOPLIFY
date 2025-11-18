/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../auth/AuthContext";
import "../styles/Cart.css";
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 
  const userId = user?._doc?._id;

  const fetchCart = async () => {
    try {
      const res = await axios.get(`https://sshoplify.onrender.com/api/cart/${userId}`);
      setCart(res.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchCart();
  }, [userId]);

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      await axios.put("https://sshoplify.onrender.com/api/cart/update", {
        userId,
        productId,
        quantity,
      });

      fetchCart();
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete("https://sshoplify.onrender.com/api/cart/remove", {
        data: { userId, productId },
      });

      fetchCart();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const handlePlaceOrder = async () => {
  const orderItems = cart.items.map(item => ({
    product: item.productId._id,   // correct product id
    quantity: item.quantity,       // correct quantity
  }));

  const amount = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  const orderData = {
    userId,
    orderItems,
    amount,
  };
  
  try {
    console.log(orderData);

    const response = await axios.post(
      "https://sshoplify.onrender.com/api/orders/addorder",
      orderData
    );

    alert(`Order placed successfully! Total Price: Rs.${amount}`);
    navigate("/orders");

  } catch (err) {
    console.error("Order error:", err);
    alert("Error placing order");
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

      <div className="container mt-4 cart-container">
        <h2 className="text-center mb-4">Your Cart</h2>

        {cart.items.map((item) => (
          <Card className="cart-card" key={item._id}>
            <div className="cart-row">

              {/* Left */}
              <div className="cart-left">
                <img
                  src={item.productId.imageURL || "/placeholder.png"}
                  alt="Product"
                  className="cart-img"
                />

                <div>
                  <h5 className="cart-title">{item.productId.title}</h5>
                  <p className="cart-price">₹{item.productId.price}</p>
                </div>
              </div>

              {/* Right */}
              <div className="cart-right">
                <Button
                  variant="secondary"
                  className="quantity-btn"
                  onClick={() =>
                    handleQuantityChange(item.productId._id, item.quantity - 1)
                  }
                >
                  -
                </Button>

                <span>{item.quantity}</span>

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
                  className="remove-btn"
                  onClick={() => handleRemove(item.productId._id)}
                >
                  Remove
                </Button>
              </div>

            </div>
          </Card>
        ))}

        <Card className="total-card">
          <h4 className="text-end">Total: ₹{totalPrice}</h4>
        </Card>

        <Button className="placeorder-button" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </div>
    </>
  );
}
