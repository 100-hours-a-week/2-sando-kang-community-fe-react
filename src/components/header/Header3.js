import React from 'react';
import '../../styles/common/header/header_3.css';

const Header = ({ title }) => {
  return (
    <header>
      <h4 className="header-title">{title}</h4>
    </header>
  );
};

export default Header;