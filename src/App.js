import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './Frontend/components/Header';
import Home from './Frontend/pages/Home';
import Cart from './Frontend/pages/Cart';
import Wishlist from './Frontend/pages/Wishlist';
import Checkout from './Frontend/pages/Checkout';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  </Router>
);

export default App;
