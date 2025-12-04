/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import '../styles/Cart.css';

export default function Cart() {
  const { user } = useContext(AuthContext);
  const hydratedUser = user?._doc ?? user;
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = hydratedUser?._id;

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
  }, [userId]);

  useEffect(() => {
    if (userId) fetchCart();
  }, [userId, fetchCart]);

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
const navigate = useNavigate();

const handleBuyNow = async () => {
  if (!cart || !cart.items.length) return;

  try {
    // 1) Prepare order items for our DB
    const orderItems = cart.items.map((item) => ({
      product: item.productId._id,
      quantity: Number(item.quantity),
    }));

    // 2) Calculate total amount in INR
    const amount = orderItems.reduce((sum, item) => {
      const product = cart.items.find((p) => p.productId._id === item.product);
      return sum + product.productId.price * item.quantity;
    }, 0);

    if (!userId) {
      alert("User not logged in");
      return;
    }

    // 3) Ask backend to create Razorpay order
    const { data } = await axios.post(
      "https://sshoplify.onrender.com/api/payment/create-order",
      { amount }
    );

    // 4) Open Razorpay Checkout
    const options = {
      key: data.key,
      amount: data.amount,
      currency: data.currency,
      name: "SHOPLIFY",
      description: "Sneaker purchase",
      order_id: data.orderId,
      handler: async function () {
        // Simplest: if payment succeeds, create order in our DB
        try {
          const res = await axios.post(
            "https://sshoplify.onrender.com/api/orders/addorder",
            {
              userId,
              orderItems,
              amount,
            }
          );
          console.log("Order created:", res.data);

          try {
            await axios.delete("https://sshoplify.onrender.com/api/cart/clear", {
              data: { userId },
            });
          } catch (clearErr) {
            console.error("Cart clear failed:", clearErr.response?.data || clearErr.message);
            if (cart?.items?.length) {
              try {
                await Promise.all(
                  cart.items.map((item) =>
                    axios.delete("https://sshoplify.onrender.com/api/cart/remove", {
                      data: { userId, productId: item.productId._id },
                    })
                  )
                );
              } catch (fallbackErr) {
                console.error("Fallback cart cleanup failed:", fallbackErr.response?.data || fallbackErr.message);
              }
            }
          }

          await fetchCart();
          alert("Payment successful! Order placed.");
          navigate("/order-success", {
            state: {
              orderId: res.data._id,
              amount,
            },
          });
        } catch (err) {
          console.error(
            "Error creating order after payment:",
            err.response?.data || err.message
          );
          alert("Payment ok but order failed. Contact support.");
        }
      },
      prefill: {
        name: hydratedUser?.username || "",
        email: hydratedUser?.email || "",
      },
      theme: {
        color: "#121212",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error(
      "Error starting payment:",
      err.response?.data || err.message
    );
    alert("Failed to start payment. Check console for details.");
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

      <div className="cart-wrapper mt-4">
        <h2 className="cart-heading text-center mb-4">Your Cart</h2>

        {cart.items.map((item) => (
          <Card className="cart-card mb-3" key={item._id}>
            <div className="cart-item-row d-flex p-3 justify-content-between align-items-center">
              <div className="cart-item-left d-flex align-items-center">
                <img
                  src={item.productId.imageURL}
                  className="cart-img"
                  alt=""
                />

                <div className="cart-item-details ms-3">
                  <h5 className="cart-title">{item.productId.title}</h5>
                  <p className="cart-price mb-0">₹{item.productId.price}</p>
                </div>
              </div>

              <div className="cart-item-right d-flex align-items-center">
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
                  className="remove-btn"
                  onClick={() => handleRemove(item.productId._id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {/* Total + Buy Now */}
        <Card className="total-card p-3 mt-4">
          <div className="cart-total-row d-flex justify-content-between align-items-center">
            <h4>Total: ₹{totalPrice}</h4>
            <Button variant="success" className="placeorder-button" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div>
        </Card>

      </div>
    </>
  );
}
