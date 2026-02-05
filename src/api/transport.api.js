import api from "./axios";

// get all transport orders
export const getTransportOrders = () =>
  api.get("/orders/transport");

// assign bus to order
export const assignBusToOrder = (orderId, data) =>
  api.put(`/orders/admin/${orderId}/assign-bus`, data);
