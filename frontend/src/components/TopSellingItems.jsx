/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../styles/FetchedCards.css'
import axios from 'axios';



const FetchedTSCards = ({category}) => {

  const navigate = useNavigate();

  const handleCardClick = (product_id) => {
    navigate(`/single/${product_id}`);
  };
  const { addToCart } = useCart();

  const [products, setProducts] = useState("");
  useEffect(() => {
    const fetchdata = async () => {
      const data = await axios.get(`http://localhost:5000/api/products/get/${category}`);
      console.log("Product --->",data)
      setProducts(data);
    };
    fetchdata();
  }, [category]);

  return (
    <>
    <div className='fetched-cards-container' >
        {products &&
          products?.data.map((product) => (
      <Card className='card' style={{ margin:14,width: '30rem' }}  key={product._id}
      onClick={() => handleCardClick(product._id)} >
        
           <img className='card-img' style={{height:"500px"}} src={product.imageURL}></img>
     
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>
          {product.details}
        </Card.Text>
        <Button variant="primary" onClick={() => addToCart(product)}>Rs.{product.price}</Button>
      </Card.Body>
    </Card>
    ))}
    
    </div>
    </>
          
         
          
    
  );
}


  






export default FetchedTSCards
