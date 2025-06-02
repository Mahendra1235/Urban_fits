import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deliveryAddress, setOrderDetails, confirmOrder } from '../slice/checkoutSlice';

const citiesByState = {
  "Andhra Pradesh": ["Anantapur", "Vijayawada", "Nellore", "Kadapa", "Rajampet", "Tirupathi"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Erode", "Tirupur", "Vellore", "Dindigul"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Ballari", "Udupi", "Tumakuru", "Kalaburagi"],
  "Kerala": ["Thiruvandram", "Kozhikode", "Thrissur", "Kollam", "Kannur", "Kochi", "Alappuzha", "Palakkad"],
  "Delhi": ["New Delhi", "Dallupura", "Mandoli", "Alipur"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
};

const Checkout = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  const address = useSelector(state => state.checkout.address);
  const [errors, setErrors] = useState({});

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = e => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (!/^[789]\d{9}$/.test(value)) {
        setErrors(prev => ({ ...prev, phone: "Phone must be 10 digits or Incorrect number" }));
      } else {
        setErrors(prev => ({ ...prev, phone: null }));
      }
    }

    if (name === "zip") {
      if (!/^\d{6}$/.test(value)) {
        setErrors(prev => ({ ...prev, zip: "ZIP must be 6 digits" }));
      } else {
        setErrors(prev => ({ ...prev, zip: null }));
      }
    }

    if (name === "state") {
      dispatch(deliveryAddress({ [name]: value, city: '' }));
    } else {
      dispatch(deliveryAddress({ [name]: value }));
    }
  };

  const handleConfirm = async () => {
  if (Object.values(errors).some(Boolean)) {
    alert("Please fix errors before submitting.");
    return;
  }

  if (!address.name || !address.street || !address.city || !address.state || !address.zip || !address.phone) {
    alert("Please fill in all fields.");
    return;
  }

  dispatch(setOrderDetails({ items, total }));
  dispatch(confirmOrder());

  try {
    const response = await fetch('http://localhost:8081/submit-order', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({address,items,total})
    });

    const data = await response.json();
    if (response.ok) {
      alert(`Order confirmed! Order ID: ${data.orderId}`);
    } else {
      alert("Failed to place order. Please try again.");
    }
  } catch (error) {
    console.error("Order submission error:", error);
    alert("Network error. Please try again.");
  }
};


  return (
    <div className="checkout-container">
      <h2>Order Summary</h2>

      <div className="checkout-items">
        {items.map(item => (
          <div className="checkout-item" key={item.id}>
            <img src={item.image} alt={item.title} style={{ width: '80px', marginRight: '1rem' }} />
            <div>
              <strong>{item.title}</strong> - ₹{item.price} × {item.quantity}
            </div>
          </div>
        ))}
      </div>

      <br />
      <h3>Delivery Address</h3>
      <form>
        <input name="name" placeholder="Full Name" value={address.name} onChange={handleChange} required />
        <input name="street" placeholder="Street Address" value={address.street} onChange={handleChange} required />

        <select name="state" value={address.state} onChange={handleChange} required>
          <option value="">Select State</option>
          {Object.keys(citiesByState).map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        <select name="city" value={address.city} onChange={handleChange} required disabled={!address.state}>
          <option value="">Select City</option>
          {address.state && citiesByState[address.state].map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <input name="zip" placeholder="ZIP Code" value={address.zip} onChange={handleChange} required />
        {errors.zip && <small style={{ color: 'red' }}>{errors.zip}</small>}

        <input name="phone" placeholder="Phone Number" value={address.phone} onChange={handleChange} required />
        {errors.phone && <small style={{ color: 'red' }}>{errors.phone}</small>}
      </form>

      <h3>Total: ₹{total.toFixed(2)}</h3>
      <button onClick={handleConfirm}>Confirm Payment</button>
    </div>
  );
};

export default Checkout;
