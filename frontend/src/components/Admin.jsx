/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../styles/SignUp_Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Admin(){

  


    const navigate = useNavigate(); 

    const handleHomeClick = () => {
      navigate('/'); // Navigate to "/signup" route
    };

    //to update user details state on every change
    // const[users,setUsers] = useState([]);
    const[product,setProduct] = useState({
      title : "",
      imageURL : "",
      price:"",
      category:"",
      details:"",
    })
  
    function handleInput(e){
      // console.log(e);
      // console.log(e.target.value);
      let name = e.target.name;
      let value = e.target.value;
      setProduct({
        ...product,
        [name] : value,   //using name in []=> dynamic coz it can be anything like username,title,pass
      });
      // console.log(user);
    };
  
    const handleSubmit = async (e) =>{
      e.preventDefault();
    //   e.stopPropagation();
      console.log(product);
    try{
  
      const response = await  axios.post(
        'http://localhost:5000/api/products/add',product );
      console.log(response); 
        setProduct({title : "",imageURL : "",price:"",category:"",details:"",});
        alert("Product Added ")
        navigate("/")  
     }
    
    catch(error){
        if (error.response && error.response.status === 401) {
            alert(error.response.data.message);
          } // Alert error message
        }
      }
    
      // useEffect(() => {
      //   const fetchdata = async () => {
      //     try {
      //       const { data } = await axios.get("http://localhost:5000/api/users/allUser");
      //       console.log(data)
      //       setUsers(data);
      //     } catch (error) {
      //       console.error("Error fetching products:", error);
      //     }
      //   };
      //   fetchdata();
      // }, []);

    return(
      <>
        <div className='admin'>
        <center className='login-text'><h1 >Admin</h1></center>
 
        <form onSubmit={handleSubmit }>

         <FloatingLabel
        
         label="title "
         className="mb-3 pass-field">
         <Form.Control type="text" 
                       placeholder="name@example.com"
                       name ='title'
                       id='title'
                       required 
                       autoComplete='off' 
                       value={product.title}
                       onChange={handleInput} />
         <br></br>
       </FloatingLabel>
       <FloatingLabel label="imageURL" className='pass-field'>
         <Form.Control type="text" 
                       name='imageURL'
                       placeholder="imageURL"
                       id='imageURL'
                       required 
                       autoComplete='off' 
                       value={product.imageURL}
                       onChange={handleInput} />
       </FloatingLabel>
       <FloatingLabel label="price" className='pass-field'>
         <Form.Control type="number" 
                       name='price'
                       placeholder="price"details                id='price'
                       required 
                       autoComplete='off' 
                       value={product.price}
                       onChange={handleInput} />
       </FloatingLabel>
       <FloatingLabel label="category " className='pass-field'>
         <Form.Control type="text" 
                       name='category'
                       placeholder="category"details                id='category'
                       required 
                       autoComplete='off' 
                       value={product.category}
                       onChange={handleInput} />
       </FloatingLabel>
       <FloatingLabel label="details" className='pass-field'>
         <Form.Control type="text" 
                       name='details'
                       placeholder="details"
                       id='details'
                       required 
                       autoComplete='off' 
                       value={product.details}
                       onChange={handleInput} />
       </FloatingLabel>
       <Button  className='signup-button' variant="info" type="submit">Add </Button>
       </form>
        <center className='bottom-login-text'>
        Check Products
        <a onClick={handleHomeClick} className=''> Home Page!</a>
        </center>
        </div>
{/* 
        <div className='allUsers'>
        <h2>All Users</h2>
        {users.map(user => (
          <div key={user._id} className='user'>
            <h3>{user.username} ({user.email})</h3>
            <h4>Orders:</h4>
            {user.orders.length > 0 ? (
              <ul>
                {user.orders.map(order => (
                  <li key={order._id}>
                    <p>Order ID: {order._id}</p>
                    <p>Amount: Rs.{order.amount}</p>
                    <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    <ul>
                      {order.orderItems.map(item => (
                        <li key={item._id}>
                          {item.product.title} - Quantity: {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        ))}
      </div> */}
        </>
    );
}


export default Admin
