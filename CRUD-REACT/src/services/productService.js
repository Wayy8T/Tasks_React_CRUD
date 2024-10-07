import axiosInstance from '../axios';

export const listProducts = () => {
    return axiosInstance.get("/api/products/all");
};

export const getProduct = (productId) => {
    return axiosInstance.get(`/api/products/${productId}`);
};

export const updateProduct = (productId, product) => {
    return axiosInstance.put(`/api/products/edit-product/${productId}`, product);
};

export const createProduct = (product) => {
    return axiosInstance.post('/api/products/create', product);
};

export const deleteProduct = (productId) => {
    return axiosInstance.delete(`/api/products/delete-product/${productId}`);
};

export const getProductWithCateID = (categoryId) => {
    return axiosInstance.delete(`/api/products/categories/${categoryId}/products?page=0`);
};

export const listProductsByCategory = (categoryId, page) => {
    return axios.get(`/api/products/categories/${categoryId}/products?page=${page}`);
};