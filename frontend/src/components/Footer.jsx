import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3">
      <Container>
        
            <center><h5>About Us</h5></center>
            <p>
              SHOPLIFY is your go-to online store for the latest trends in shoes for men, women, and kids. 
              We offer a wide range of shoes to suit all styles and preferences.
            </p>
        <Row>
          <Col className="text-center">
            <p className="footer-copy">&copy; {new Date().getFullYear()} SHOPLIFY</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
