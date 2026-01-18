import axios from "./axios"; 

export const addToCartAPI = (payload) =>
  axios.post("/cart/add", payload);

export const getCartAPI = () =>
  axios.get("/cart");

export const updateCartItemAPI = (payload) =>
  axios.put("/cart/update", payload);

export const removeCartItemAPI = (payload) =>
  axios.delete("/cart/remove", { data: payload });

export const clearCartAPI = () =>
  axios.delete("/cart/clear");


export const removePurchasedItemsAPI = (data) =>
  api.post("/cart/remove-purchased", data);
