import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import NavBar from './NavBar';
import '../styles/SingleProductPage.css'; // Import the new CSS file

const SingleProductPage = () => {
  const { id } = useParams(); // Get product id from URL
  const [product, setProduct] = useState("");
    const { user } = useContext(AuthContext);
const handleAddToCart = async (product) => {
  console.log("User ID:", user?._doc?._id);
  console.log("Product ID:", product?._id);

  try {
    const res = await axios.post("https://sshoplify.onrender.com/api/cart/add", {
      userId: user._doc._id,
      productId: product._id,
      quantity: 1
    });

    console.log("Added to cart:", res.data);
    alert("Added to cart!");

  } catch (error) {
    console.error("Add to cart error:", error.response?.data || error.message);
    alert("Failed to add to cart.");
  }
};



  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get(`https://sshoplify.onrender.com/api/products/get/single/${id}`);
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
          <Button variant="primary" className="button-primary" onClick={() => handleAddToCart(product)}>Add to Cart</Button>
        </div>
      </div>
    </>
  );
}

export default SingleProductPage;
