
import { Flex } from 'antd';
import React from 'react'
import Badge from 'react-bootstrap/Badge';
import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { AuthContext } from '../auth/AuthContext';
import Nav from 'react-bootstrap/Nav';
import { RiAdminLine } from "react-icons/ri";

import Navbar from 'react-bootstrap/Navbar';
import { RiShoppingCartLine } from "react-icons/ri";
import { GoInbox } from "react-icons/go";
import {Link, useNavigate} from 'react-router-dom';
// // import { username } from './LogIn';
// import username from './LogIn';
import '../styles/NavBar.css';
import { useCart } from '../contexts/CartContext';


const NavBar = () => {
  const {cart} = useCart();
  const { user ,dispatch} = useContext(AuthContext);

  const navigate = useNavigate();
  // console.log(user._doc);
  
  const handleLoginClick = () => {

    navigate('/login');
  };

  const handleLogoutClick = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login")
  };

  return (
    <Navbar   collapseOnSelect className="main-nav" style={{ backgroundColor:"#f8f9fa" }}  >
    <Container fluid className="main-nav">
      <Navbar.Brand href="#" className='nav-logo-text'>SHOPLIFY</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0 collapse navbar-collapse "
          style={{ maxHeight: '100px',display:Flex,justifyContent:'space-evenly'}}
          navbarScroll
        >
          <Link to="/" className="nav-text justify-content-md-center ">Home</Link>
          <Link to="/men" className="nav-text justify-content-md-center hide">Men</Link>
          <Link to="/women" className="nav-text justify-content-md-center hide">Women</Link>
          <Link to="/kids" className="nav-text justify-content-md-center hide">Kids</Link>
          <Link to="/about" className="nav-text justify-content-md-center ">About</Link>
          {/* <Button className="nav-login-button" onClick={handleSignUpClick}>Log In</Button> */}
          {/* <h5>hi username</h5> */}
          <div>
          <Link to="/cart" className="nav-text justify-content-md-center"><RiShoppingCartLine className="cart-icon"/>
          <Badge className="cart-badge" bg="secondary">{cart.length}</Badge></Link>
          </div>
          <Link to="/orders" className="nav-text justify-content-md-center"><GoInbox className="cart-icon"/></Link>


          
          {user ? (
            <>
              
              {user._doc.email === "piyush17@gmail.com" && (
                  <Link to="/admin" className="nav-text justify-content-md-center"><RiAdminLine className="cart-icon"/></Link>
                )}
                <b>{user._doc.username}</b>
              <Button className="nav-login-button" onClick={handleLogoutClick}>Logout</Button>
              </>
            ) : (
              
              <Button className="nav-login-button" onClick={handleLoginClick}>Log In</Button>
            )}
        </Nav>
      
      </Navbar.Collapse>
    </Container>
  </Navbar>
  
  
  )
}

export default NavBar;
