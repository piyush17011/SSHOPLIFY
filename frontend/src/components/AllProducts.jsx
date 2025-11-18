/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import '../styles/AllProducts.css';
import axios from 'axios';
import Form from 'react-bootstrap/Form';



const AllProducts = () => {
  const navigate = useNavigate(); 

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    const fetchdata = async () => {
      try {
        const { data } = await axios.get("https://sshoplify.onrender.com/api/products/get");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchdata();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <NavBar/>
      <div className="search-bar-container">
        
        <Form.Control
        
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>
      <div className="allp-container">
        {filteredProducts.map((product) => (
          <Card className='card' style={{ margin:14, width: '30rem' }} key={product._id}>
            <img className='card-img' src={product.imageURL} onClick={() => navigate(`/single/${product._id}`)} />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>
                {product.details}
              </Card.Text>
              <Card.Text>
                {product.category}
              </Card.Text>
              <Button variant="primary" onClick={() =>navigate(`/single/${product._id}`)}>Rs.{product.price}</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}

export default AllProducts;
