/* eslint-disable jsx-a11y/anchor-is-valid */
// Frontend (React)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import { useContext } from 'react'; 
import '../styles/Order.css';
import { useNavigate } from 'react-router-dom';

const Orders = () => {

  const navigate = useNavigate(); 

    const handleHomeClick = () => {
      navigate('/'); 
    };
    const { user } = useContext(AuthContext);
    const hydratedUser = user?._doc ?? user;
    useEffect(() => {
    if (!hydratedUser) {
      navigate('/login');
    }
  }, [hydratedUser, navigate]);
   
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!hydratedUser?._id) {
          return;
        }
        const response = await axios.get(`https://sshoplify.onrender.com/api/orders/userorder/${hydratedUser._id}`); // Adjust URL as per your backend endpoint
        console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [hydratedUser?._id]);

  return (
    
    <div className="orders-container">
      <h2>Your Orders</h2>
      <div>
        {orders.map((order) => (
          <div className="order-card" key={order._id}>
            <h3>Order ID: {order._id}</h3>
            <p>Amount: Rs.{order.amount}</p>
            <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>User: {order.userId[0].username} ({order.userId[0].email})</p>
            <ul>
              {order.orderItems.map((item) => (
                <li key={item._id}>
                  {item.product.title} - Quantity: {item.quantity}
                </li>
              ))}
            </ul>
            <hr />
          </div>
        ))}
      </div>

      <center className='bottom-login-text'>
        <p style={{textDecoration:'underline'}} onClick={handleHomeClick} > Go To Home Page!</p>
        </center>

    </div>
    
  );
};

export default Orders;
