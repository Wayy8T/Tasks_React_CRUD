import axios from 'axios'

const REST_API_BASE_URL = 'http://localhost:8080/api/products'

export const listProducts = () => axios.get(REST_API_BASE_URL + "/all");
export const getProduct = (productId) => axios.get(`${REST_API_BASE_URL}/${productId}`);
export const updateProduct = (productId, product) => axios.put(`${REST_API_BASE_URL}/edit-product/${productId}`, product)
export const createProduct = (product) => axios.post(REST_API_BASE_URL + '/create', product);
export const deleteProduct = (productId) => axios.delete(REST_API_BASE_URL + '/delete-product/' + productId)