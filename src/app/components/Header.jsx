import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='component'>
      <Link to="/">Home</Link>
      <Link to="/d">Docs</Link>
    </header>
  );
};

export default Header;
