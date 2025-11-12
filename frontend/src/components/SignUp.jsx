/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import 'bootstrap/dist/css/bootstrap.min.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../styles/SignUp_Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp(){

  const navigate = useNavigate(); 
    const handleLoginClick = () => {
      navigate('/login'); // Navigate to "/signup" route
    };

  //to update user details state on every change
  
  const[user,setUser] = useState({
    username : "",
    email : "",
    password : "",
  })

  function handleInput(e){
    // console.log(e);
    // console.log(e.target.value);
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name] : value,   //using name in []=> dynamic coz it can be anything like username,email,pass
    });
    // console.log(user);
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    e.stopPropagation();
    console.log(user);
  try{
    // http://localhost:5000/api/users/register

    // const response = await fetch(`http://localhost:5000/api/users/register`,{
    //   method :"POST",
    //   headers :  {
    //     "Content-Type" : "application/json",
    //   },
    //   body: JSON.stringify(user),
    // });
    // console.log(response);
    
    // if(response.data === "Exists"){
    //   alert("Already Exists")
    //   setUser({username : "",email : "",password : ""});
    // }
    
    // if (response.ok){
    //   setUser({username : "",email : "",password : ""});
    //   alert("Account Created ")
    //   // navigate("/login")
    // }
    const response = await  axios.post(
      'http://localhost:5000/api/users/register',user );
    console.log(response);
     if(response.data.message === "Exists"){
      alert("Already Exists")
      setUser({username : "",email : "",password : ""});
    }
     else{ 
      setUser({username : "",email : "",password : ""});
      alert("Account Created ")
      navigate("/login")
    
   }
  }
  catch(err){
    if (!err?.response) {
      alert('No Server Response');
    }else {
      alert('Registration Failed')
  }
  }

    

  }

    return(
       <div className='sign-up'>
       <h1 >Sign Up Page</h1>

       <form onSubmit={handleSubmit }>
       <FloatingLabel
       
        label="Username"
        className="mb-3 username-field">
        <Form.Control type="text" 
                      name='username'
                      placeholder="Username" 
                      id='username'
                      required 
                      autoComplete='off' 
                      value={user.username}
                      onChange={handleInput}
                     />
        <br></br>
      </FloatingLabel>
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
      <Button  className='signup-button' variant="info" type="submit">Register</Button>
      </form>

      <center className='bottom-login-text'>
        Already Have an Account?
        <a onClick={handleLoginClick} className=''> Try logging in!</a>
        </center>

       </div>
    );
}
export default SignUp;