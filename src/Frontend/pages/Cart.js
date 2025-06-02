import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../slice/cartSlice';

const Cart = () => {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td className="item-details">
                    <img src={item.image} alt={item.title} />
                    <span>{item.title}</span>
                  </td>
                  <td>₹{item.price}</td>
                  <td>
                    <div className="quantity-controls">
                      <button onClick={() => dispatch(decrementQuantity(item.id))}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
                    </div>
                  </td>
                  <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button className="remove-btn" onClick={() => dispatch(removeFromCart(item.id))}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => navigate('/checkout')} className="checkout-btn">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
