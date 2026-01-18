
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartFromBackend: (state, action) => {
      const cart = action.payload;

      state.items = cart.items.map((item) => ({
        productId: item.productId,       
        variantLabel: item.variantLabel,  
        price: item.price,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
      }));

      state.totalQuantity = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { setCartFromBackend, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
