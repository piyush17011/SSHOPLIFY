/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../styles/Cards.css';
import {useNavigate} from 'react-router-dom';
//https://webdesign.tutsplus.com/horizontal-scrolling-card-ui-flexbox-and-css-grid--cms-41922t/ 

const Cards = () => {

  const navigate = useNavigate(); 
  const handleMenClick = () => {
    navigate('/men');
  };
  const handleWomenClick = () => {
    navigate('/women');
  };
  const handleKidsClick = () => {
    navigate('/kids');
  };

  return (
    //Shoes :
    <>
    
    <center><h3>Categories :</h3></center>
    <div className='cards-container'>
    
    <Card className='card' style={{ margin:14,width: '37rem' }} >
      
    <img style={{height:"410px"}} className="card-img" src="../images/men2.jpg"></img>
     
      <Card.Body>
        <Card.Title className="card-title">Men</Card.Title>
        <Card.Text>
        Men's shoes are designed to combine style, comfort, and durability. 
        Whether it's for sports, casual wear, or formal occasions, men's shoes offer a 
        range of designs and technologies to support active lifestyles and fashion-forward
        looks.
        </Card.Text>
        <Button variant="primary" onClick={handleMenClick}>Men's Section</Button>
      </Card.Body>
    </Card>

    <Card className='card' style={{ margin:14,width: '37rem' }}>
    <img className="card-img" src="../images/women.png"></img>
     
      <Card.Body>
        <Card.Title className="card-title">Women</Card.Title>
        <Card.Text>
        Women's shoes focus on versatility, comfort, and chic style. They are
         crafted to cater to various activities and fashion preferences, from 
         running and training to everyday casual and elegant evening wear.
        </Card.Text>
        <Button variant="primary" onClick={handleWomenClick}>Women's Section</Button>
      </Card.Body>
    </Card>

    <Card className='card' style={{ margin:14,width: '37rem' }}>
    <img  className="card-img" src="../images/kids.png"></img>
     
      <Card.Body>
        <Card.Title className="card-title">Kids</Card.Title>
        <Card.Text>
        Kids' shoes are built with durability, comfort, and fun designs in mind. 
        They cater to the needs of growing feet and active play, featuring robust 
        construction and vibrant colors that appeal to young wearers
        </Card.Text>
        <Button variant="primary"  onClick={handleKidsClick}>Kid's Section</Button>
      </Card.Body>
    </Card>

    
     
      
    </div>

    
</>
  )
}

export default Cards
