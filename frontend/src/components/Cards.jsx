/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../styles/Cards.css';
import { useNavigate } from 'react-router-dom';

const Cards = () => {
  const navigate = useNavigate();

  const handleMenClick = () => navigate('/men');
  const handleWomenClick = () => navigate('/women');
  const handleKidsClick = () => navigate('/kids');

  return (
    <>
      <center><h3>Categories :</h3></center>

      <div className="home-cards-container">

        {/* MEN */}
        <Card className="home-card">
          <img
            className="home-card-img"
            src="../images/men2.jpg"
            alt="Men"
          />

          <Card.Body className="home-card-body">
            <Card.Title className="home-card-title">Men</Card.Title>

            <Card.Text className="home-card-text">
              Men's shoes combine style, comfort, and durability—from sports
              to casual and formal wear.
            </Card.Text>

            <Button variant="primary" onClick={handleMenClick}>
              Men’s Section
            </Button>
          </Card.Body>
        </Card>

        {/* WOMEN */}
        <Card className="home-card">
          <img
            className="home-card-img"
            src="../images/women.png"
            alt="Women"
          />

          <Card.Body className="home-card-body">
            <Card.Title className="home-card-title">Women</Card.Title>

            <Card.Text className="home-card-text">
              Women’s shoes focus on versatility, comfort and chic style—from
              training to casual and evening wear.
            </Card.Text>

            <Button variant="primary" onClick={handleWomenClick}>
              Women’s Section
            </Button>
          </Card.Body>
        </Card>

        {/* KIDS */}
        <Card className="home-card">
          <img
            className="home-card-img"
            src="../images/kids.png"
            alt="Kids"
          />

          <Card.Body className="home-card-body">
            <Card.Title className="home-card-title">Kids</Card.Title>

            <Card.Text className="home-card-text">
              Kids' shoes are durable, comfy and vibrant—perfect for growing
              feet and active play.
            </Card.Text>

            <Button variant="primary" onClick={handleKidsClick}>
              Kids’ Section
            </Button>
          </Card.Body>
        </Card>

      </div>
    </>
  );
};

export default Cards;
