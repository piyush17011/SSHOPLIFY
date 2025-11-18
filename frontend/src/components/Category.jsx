/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import NavBar from "./NavBar";
import "../styles/Category.css";  // <- NEW FILE
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';

const Category = ({ category }) => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://sshoplify.onrender.com/api/products/get/${category}`
        );
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, [category]);

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <NavBar />

      <div className="search-bar-container">
        <Form.Control
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      <div className="cat-container">
        {filteredProducts.map((product) => (
          <Card className="cat-card" key={product._id}>
            
            {/* Product Image */}
            <img
              className="cat-img"
              src={product.imageURL}
              alt={product.title}
              onClick={() => navigate(`/single/${product._id}`)}
            />

            {/* Card Body */}
            <Card.Body className="cat-body">
              <h3 className="cat-title">{product.title}</h3>
              <p className="cat-details">{product.details}</p>
              <p className="cat-category">{product.category}</p>

              <Button
                variant="primary"
                className="cat-price-btn"
                onClick={() => navigate(`/single/${product._id}`)}
              >
                ₹{product.price}
              </Button>
            </Card.Body>

          </Card>
        ))}
      </div>
    </>
  );
};

export default Category;
