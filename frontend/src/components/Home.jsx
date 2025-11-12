import React from 'react'
import NavBar from './NavBar'
import Hero from './Hero';
import Cards from './Cards';
import TopSellingItems from './TopSellingItems';
import Footer from './Footer';
const Home = () => {
  return (
    <div>
      <NavBar />
      <Hero/>
      
      <center><h4> TOP SELLING PRODUCTS :</h4></center>
      
      <TopSellingItems category={"ts"}/>
      <Cards/> 
      <Footer/>
    </div>
  )
}

export default Home
