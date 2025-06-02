import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    address: {
       name: '',
       street: '',
       city: '',
       state: '',
       zip: '',
       phone: '',
    },
    orderConfirmed: false,    
};

export const checkoutSlice = createSlice({
    name:'checkout',
    initialState,
    reducers:{
        deliveryAddress(state, action) {
            state.address = {...state.address, ...action.payload};
        },

        setOrderDetails(state, action) {
            state.orderItems = action.payload.items;
            state.totalAmount = action.payload.total;
        },

        confirmOrder(state) {
            state.orderConfirmed = true;
        },

        resetCheckout(state) {
            state.address = {
                name: '',
                 street: '',
                 city: '',
                 state: '',
                 zip: '',
                 phone: '',
            };
            state.orderConfirmed = false;
        },
    },
});

export const {deliveryAddress, setOrderDetails, confirmOrder, resetCheckout}= checkoutSlice.actions;
export default checkoutSlice.reducer;