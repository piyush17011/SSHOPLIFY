import React from 'react';
import { useCart } from '../contexts/CartContext';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import '../styles/Cart.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import { AuthContext } from '../auth/AuthContext';
import { useContext } from 'react';

const Cart = () => {

  const navigate = useNavigate(); 
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { user } = useContext(AuthContext);
  var userId = user._doc._id;
  console.log(userId);
  console.log(cart);
  let amount = 0
  cart.map(item =>
    amount += item.price * item.quantity
  )

  const handlePlaceOrder = async () => {
    const orderItems = cart.map(item => ({
      product: item._id,
      quantity: item.quantity,
    }));

    const orderData = {
      userId,
      orderItems,
      amount,
    };

    try {
      console.log(orderData)
      const response = await axios.post('http://localhost:5000/api/orders/addorder', orderData);
      console.log(response.data); // Assuming the response contains the newly created order
      
      alert(`Order placed successfully! 
              Total Price : Rs.${amount}`);
              navigate('/orders');
    } catch (error) {
      alert(error);
    }
  };




  return (
        <>
        <NavBar/>
    <div >
      <center><h2 style={{marginTop:"18px"}}>Your Cart</h2></center>
      
      <ListGroup style={{borderRadius:"30px"}} className='cart-container'>
        {cart.map(item => (
          <ListGroup.Item style={{borderRadius:"30px",margin:"10px",padding:"0px"}} key={item._id}>
            <div className='cart-container1'>
              <span className='cart-item'>{item.title}</span>
              <span className='cart-item'>Rs.{item.price}</span>
              <input
                className='cart-item'
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                min="1"
              />
              
              <Button className='cart-item' variant="danger" onClick={() => removeFromCart(item._id)}>Remove</Button>
            </div>
          </ListGroup.Item>

        ))}
      </ListGroup>
      <center>
      <h2 className='amount' >Total Amount :<span style={{color:"blue"}}> Rs.{amount}</span></h2>
      <button  className='place-order' onClick={handlePlaceOrder}>Place Order</button>
      </center>
      
    </div>
    </>
  );
};

export default Cart;
