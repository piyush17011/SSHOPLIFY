import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { useCart } from '../contexts/CartContext';
import NavBar from './NavBar';
import '../styles/SingleProductPage.css'; // Import the new CSS file

const SingleProductPage = () => {
  const { id } = useParams(); // Get product id from URL
  const [product, setProduct] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get(`http://localhost:5000/api/products/get/single/${id}`);
      console.log("Product --->",response.data)
      setProduct(response.data);
    };
    fetchdata();
  }, [id]);


  return (
    <>
      <NavBar/>
      <div className='single-product-container'>
        <img className="product-image" src={product.imageURL} alt={product.title} />
        <div className="product-details">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-description">{product.details}</p>
          <p className="product-category">Category: {product.category}</p>
          <p className="product-price">Price: Rs.{product.price}</p>
          <Button variant="primary" className="button-primary" onClick={() => addToCart(product)}>Add to Cart</Button>
        </div>
      </div>
    </>
  );
}

export default SingleProductPage;
