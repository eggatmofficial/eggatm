import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  items: [],
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    startCheckout: (state, action) => {
      state.items = action.payload; 
    },
    clearCheckout: (state) => {
      state.items = [];
    },
  },
});


export const { startCheckout, clearCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;