/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";

import "../styles/FetchedCards.css"; // Updated CSS

const FetchedTSCards = ({ category }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // Fetch products
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `https://sshoplify.onrender.com/api/products/get/${category}`
        );
        setProducts(response.data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchdata();
  }, [category]);

  const handleCardClick = (id) => {
    navigate(`/single/${id}`);
  };

  return (
    <div className="ts-cards-container">
      {products.map((product) => (
        <Card
          className="ts-card"
          key={product._id}
          onClick={() => handleCardClick(product._id)}
        >
          {/* Image */}
          <img className="ts-card-img" src={product.imageURL} alt={product.title} />

          {/* Body */}
          <Card.Body>
            <h5 className="ts-card-title">{product.title}</h5>
            <p className="ts-card-price">₹{product.price}</p>

            <Button
              variant="primary"
              onClick={(e) => {
                e.stopPropagation(); // prevents card click
                navigate(`/single/${product._id}`);
              }}
            >
              View Product
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default FetchedTSCards;
