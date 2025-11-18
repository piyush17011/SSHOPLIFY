import React from 'react';
import '../styles/About.css'; // Import your CSS file
import NavBar from './NavBar';

const About = () => {
  return (
    <>
    <NavBar/>
    <div className="about-container">
      <h1 className="about-heading">About SHOPLIFY</h1>
      <p className="about-content">
        SHOPLIFY is your go-to online store for the latest trends in shoes for men, women, and kids. We offer a wide range of shoes to suit all styles and preferences.
      </p>
      <h2 className="about-heading"> About me :</h2>
      <p className="about-content">
        Github : https://github/piyush17011
      </p>
    </div>
    </>
  );
}

export default About;
