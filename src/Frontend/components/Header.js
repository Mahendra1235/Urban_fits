import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img
          src="https://img.freepik.com/premium-vector/uf-logo-design_1016686-1578.jpg"
          alt="Urban Fits Logo"
          className="logo-img"
        />
        <h1>Urban fits</h1>
      </div>
      <nav className="nav-links">
        <ul>
          <li>
            <Link to="/">
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <i className="fas fa-shopping-cart"></i> Cart
            </Link>
          </li>
          <li>
            <Link to="/wishlist">
              <i className="fas fa-heart"></i> Wishlist
            </Link>
          </li>
          <li>
            <Link to="/checkout">
              <i className="fas fa-credit-card"></i> Checkout
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
