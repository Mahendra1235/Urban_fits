import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slice/cartSlice';
import wishlistReducer from '../slice/wishlistSlice';
import checkoutReducer from '../slice/checkoutSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    checkout: checkoutReducer,
  },
});
