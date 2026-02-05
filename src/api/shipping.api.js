import api from "./axios";


export const getShippingPrices = () =>
  api.get("/shipping");

export const createShippingPrice = (data) =>
  api.post("/shipping", data);

export const updateShippingPrice = (id, data) =>
  api.put(`/shipping/${id}`, data);

export const deleteShippingPrice = (id) =>
  api.delete(`/shipping/${id}`);
