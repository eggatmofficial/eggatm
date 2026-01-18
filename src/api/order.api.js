import axios from "./axios";

export const buyNowOrderAPI = (data) =>
  axios.post("/orders/buy-now", data);

export const cartCheckoutAPI = (data) =>
  axios.post("/orders/cart/checkout", data);

export const initiate = (data) => 
  axios.post("/payments/initiate",data)

export const verify = (data) => 
  axios.post("/payments/verify",data)
