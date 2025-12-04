import { Flex } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { AuthContext } from '../auth/AuthContext';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { RiAdminLine, RiShoppingCartLine } from "react-icons/ri";
import { GoInbox } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';

import '../styles/NavBar.css';

const NavBar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const hydratedUser = user?._doc ?? user;
  const userId = hydratedUser?._id;
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);

  // FETCH CART COUNT WITHOUT BREAKING CSS
  useEffect(() => {
    if (!userId) {
      setCartCount(0);
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await fetch(
          `https://sshoplify.onrender.com/api/cart/${userId}`
        );
        const data = await res.json();
        setCartCount(data?.items?.length || 0);
      } catch (err) {
        console.error("Cart fetch error:", err);
      }
    };

    fetchCart();
  }, [userId]);

  const handleLoginClick = () => navigate('/login');

  const handleLogoutClick = () => {
    dispatch({ type: "LOGOUT" });
    navigate('/login');
  };

  return (
    <Navbar collapseOnSelect className="main-nav" style={{ backgroundColor: "#f8f9fa" }}>
      <Container fluid className="main-nav">

        <Navbar.Brand className="nav-logo-text">SHOPLIFY</Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 collapse navbar-collapse"
            style={{ maxHeight: '100px', display: Flex, justifyContent: 'space-evenly' }}
            navbarScroll
          >
            <Link to="/" className="nav-text">Home</Link>
            <Link to="/men" className="nav-text hide">Men</Link>
            <Link to="/women" className="nav-text hide">Women</Link>
            <Link to="/kids" className="nav-text hide">Kids</Link>
            <Link to="/about" className="nav-text">About</Link>

            {/* CART ICON - CSS UNCHANGED */}
            <div>
            <Link
                to={hydratedUser ? "/cart" : "/login"}
                className="nav-text"
              >
                <RiShoppingCartLine className="cart-icon" />
                <Badge className="cart-badge" bg="secondary">
                  {cartCount}
                </Badge>
              </Link>
            </div>

            {/* ORDERS ICON */}
            <Link to={hydratedUser ? "/orders" : "/login"} className="nav-text">
              <GoInbox className="cart-icon" />
            </Link>

            {/* ADMIN PANEL ICON */}
            {hydratedUser?.email === "admin@admin.com" && (
              <Link to="/admin" className="nav-text">
                <RiAdminLine className="cart-icon" />
              </Link>
            )}

            {/* AUTH BUTTONS */}
            {hydratedUser ? (
              <>
                <b>{hydratedUser?.username ?? "User"}</b>
                <Button className="nav-login-button" onClick={handleLogoutClick}>
                  Logout
                </Button>
              </>
            ) : (
              <Button className="nav-login-button" onClick={handleLoginClick}>
                Log In
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default NavBar;
