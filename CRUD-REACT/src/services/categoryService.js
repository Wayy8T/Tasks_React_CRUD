import axios from 'axios'

const REST_API_BASE_URL = 'http://localhost:8080/api/categories'

export const listCategories = () => axios.get(REST_API_BASE_URL + "/all-category");
export const getCategory = (categoryId) => axios.get(`${REST_API_BASE_URL + "/detail-category"}/${categoryId}`);
export const updateCategory = (categoryId, category) => axios.put('http://localhost:8080/api/categories/edit-category/' + categoryId, category)
export const createCategory = (category) => axios.post(REST_API_BASE_URL + '/add-category', category);
export const deleteCategory = (categoryId) => axios.delete(REST_API_BASE_URL + '/delete-category/' + categoryId)  