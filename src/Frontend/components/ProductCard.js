import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slice/cartSlice';
import { addToWishlist } from '../slice/wishlistSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>₹{product.price}</p>
      <button onClick={() => dispatch(addToCart(product))}>
        <i className="fas fa-shopping-cart"></i> Add to Cart
      </button>
      <button onClick={() => dispatch(addToWishlist(product))}>
        <i className="fas fa-heart"></i> Wishlist
      </button>
    </div>
  );
};

export default ProductCard;
