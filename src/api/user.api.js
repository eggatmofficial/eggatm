import axios from "./axios"; 

export const getUsers = (status = "all") => {
  const query = status === "all" ? "" : `?status=${status}`;
  return axios.get(`/users/list${query}`);
};

export const createUser = (data) => {
  return axios.post("/users/create", data);
};

export const updateUser = (id, data) => {
  return axios.put(`/users/update/${id}`, data);
};

export const deleteUser = (id) => {
  return axios.delete(`/users/delete/${id}`);
};

export const toggleUserStatus = (id) => {
  return axios.patch(`/users/${id}/status`);
};
