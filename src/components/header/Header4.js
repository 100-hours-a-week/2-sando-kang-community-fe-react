import React from 'react';
import '../../styles/common/header/header_4.css';


const Header = ({ title }) => {
  const handleBack = () => {
    window.history.back(); 
  };
  return (
    <header>
        <div id='header-container'>
            <div className="back-button" onClick={handleBack}>
                &lt;
            </div>
            <div className="title">
                <h4>{title}</h4>
            </div>
        </div>
    </header>
  );
};

export default Header;