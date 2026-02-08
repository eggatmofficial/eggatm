
import api from "./axios";


export const getFranchises = () =>
  api.get("/franchise/admin");


export const getUserFranchises = () =>
  api.get("/franchise");

export const createFranchise = (data) =>
  api.post("/franchise/create", data);

export const updateFranchise = (id, data) =>
  api.put(`/franchise/${id}`, data);

export const deleteFranchise = (id, data) =>
  api.delete(`/franchise/${id}`);

