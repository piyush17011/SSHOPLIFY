import React from 'react'
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';

import '../styles/Hero.css'



const Hero = () => {
  const navigate = useNavigate(); 
  const handleAllProduct = () => {
    
    navigate('/allproducts'); 
  };
  return (
    <div >
    <Carousel >
      <Carousel.Item>
        {/* style={{objectFit:"fill",height:"450px"} } */}
      <img 
            className="d-block w-100 carousel-img"
            //ronaldo : https://sportskhabri.com/wp-content/uploads/2023/05/Cristiano-Ronaldo-Sponsors-Cristiano-Ronaldo-Brand-Endorsements-Brand-collaborations-charity-work-business-investments.jpg
            src={"../images/shoe3.jpg"}
            alt="First slide"
          />
      
        <Carousel.Caption className='carousel-text'>
          
          <h3>P U M A</h3>
          <p> A blend of performance-oriented products and stylish designs.</p>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img
            className="d-block w-100 carousel-img "
            src={"../images/shoe1.jpg"}
            alt="Second slide"
          />
   
        <Carousel.Caption className='carousel-text'>
          <h3>N I K E</h3>
          <p>Innovative and high-performance athletic footwear.</p>
        </Carousel.Caption>

        </Carousel.Item>
     <Carousel.Item>
      <img 
            className="d-block w-100 carousel-img"
            src={"../images/shoe5.jpg"}
            alt="First slide"
          />
      
       
        <Carousel.Caption className='carousel-text'>
          <h3>A R I G A T O</h3>
          <p>
           Features a minimalist design with a premium leather and a comfortable cushioned footbed
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <center className='shop-button'>
    <Button variant="primary" onClick={handleAllProduct}>Shop Now !</Button>
    
    </center>
    
    </div>
  )
}

export default Hero
