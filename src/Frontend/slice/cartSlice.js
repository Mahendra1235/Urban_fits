import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  history: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existing = state.items.find(i => i.id === item.id);
      if (existing) {
        existing.quantity += 1;
        state.history.push({ type: 'incrementQuantity', id: item.id });
      } else {
        state.items.push({ ...item, quantity: 1 });
        state.history.push({ type: 'addToCart', item });
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        state.history.push({ type: 'removeFromCart', item });
        state.items = state.items.filter(i => i.id !== id);
      }
    },
    clearCart(state) {
      state.history.push({ type: 'clearCart', previousItems: [...state.items] });
      state.items = [];
    },
    incrementQuantity(state, action) {
      const id = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        item.quantity += 1;
        state.history.push({ type: 'incrementQuantity', id });
      }
    },
    decrementQuantity(state, action) {
      const id = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.history.push({ type: 'decrementQuantity', id });
      } else if (item) {
        state.items = state.items.filter(i => i.id !== id);
        state.history.push({ type: 'removeFromCart', item });
      }
    },
  },
});

export const {addToCart,removeFromCart,clearCart,incrementQuantity,decrementQuantity} = cartSlice.actions;

export default cartSlice.reducer;
