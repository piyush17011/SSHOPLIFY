/* eslint-disable no-const-assign */
/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable jsx-a11y/anchor-is-valid */
import 'bootstrap/dist/css/bootstrap.min.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../styles/SignUp_Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';




function LogIn(){
  const[user,setUser] = useState({
    email : "",
    password : "",
  })
  const navigate = useNavigate(); 
  // console.log(useContext(AuthContextProvider));
  const { dispatch } = useContext(AuthContext);
  
  const handleLogin = async(e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(`https://sshoplify.onrender.com/api/users/login`,(user));
      
      const result = await res.data;
      console.log(result);
      if (!result) {
        alert("Incorrect Login Credentials");
      } 
      else {
        // console.log(result.data);
        alert("Logging in...");
       dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
        navigate("/");
      }
    } catch (error) {
      alert("Incorrect Login Credentials");
     dispatch({ type: "LOGIN_FAILURE", payload: error.message });
    }
  };
  
    

    const handleRegisterClick = () => {
      navigate('/signup'); // Navigate to "/signup" route
    };

    //to update user details state on every change
    
   

    function handleInput(e){

      let name = e.target.name;
      let value = e.target.value;
      setUser({
        ...user,
        [name] : value,   //using name in []=> dynamic coz it can be anything like username,email,pass
      });
      // console.log(user);
    };
    
    
    


    return(
        <div className='login'>
        <center className='login-text'><h1 >Login Page</h1></center>
 
        <form >

         <FloatingLabel
        
         label="Email address"
         className="mb-3 email-field">
         <Form.Control type="email" 
                       placeholder="name@example.com"
                       name ='email'
                       id='email'
                       required 
                       autoComplete='off' 
                       value={user.email}
                       onChange={handleInput} />
         <br></br>
       </FloatingLabel>
       <FloatingLabel label="Password" className='pass-field'>
         <Form.Control type="password" 
                       name='password'
                       placeholder="Password"
                       id='password'
                       required 
                       autoComplete='off' 
                       value={user.password}
                       onChange={handleInput} />
       </FloatingLabel>
       <Button  className='signup-button' variant="info" type="submit" onClick={handleLogin} >Login</Button>
       </form>
        <center className='bottom-login-text'>
        Dont Have an Account?
        <a onClick={handleRegisterClick} className=''> Register Here!</a>
        </center>
        <center className='bottom-login-text'>
        
        <a onClick={()=>navigate('/')} className=''>Go to Home Page</a>
        </center>
        </div>
    );
}

export default LogIn;

