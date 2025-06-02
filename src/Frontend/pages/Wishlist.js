import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../slice/wishlistSlice';


const Wishlist = () => {
  const items = useSelector(state => state.wishlist.items);
  const dispatch = useDispatch();

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">Wishlist</h2>
      {items.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        items.map(item => (
          <div className="wishlist-item" key={item.id}>
            <img src={item.image} alt={item.title} />
            <strong>{item.title}</strong> - ₹{item.price}
            <button onClick={() => dispatch(removeFromWishlist(item.id))}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;
