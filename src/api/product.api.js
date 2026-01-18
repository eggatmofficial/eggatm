import api from "./axios";


export const getAllProducts = () =>
  api.get("/products/getAllProducts");


export const getProductById = (id) =>
  api.get(`/products/getProducts/${id}`);


export const createProduct = (formData) =>
  api.post("/products/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });


export const updateProduct = (id, formData) =>
  api.put(`/products/Products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });


export const deleteProduct = (id) =>
  api.delete(`/products/Products/${id}`);



export const toggleProductStatus = (id) => {
  return axios.patch(`/products/Products/${id}/status`);
};


export const getProductsAPI = (search = "") => {
  return api.get(`/products?search=${search}`);
};