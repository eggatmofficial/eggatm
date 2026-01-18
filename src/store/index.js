import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.store";
import cartReducer from "./cart.store";
import productReducer from "./product.store";
import checkoutReducer from "./checkout.store";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
    checkout: checkoutReducer,
  },
});
