import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/landing/landing.css';

const Landing = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/login');
  };

  return (
    <div className="landing-container">
      <h1>Will you join<br />squid world?</h1>
      <button onClick={handleButtonClick}>Yes</button>
    </div>
  );
};

export default Landing;
