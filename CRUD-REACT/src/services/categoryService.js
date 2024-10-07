import axiosInstance from '../axios';
const REST_API_BASE_URL = 'http://localhost:8080/api/categories'


// Service để lấy danh sách categories với accessToken
// export const listCategories = () => {
//     const config = {
//         headers: {
//             'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
//             'Content-Type': 'application/json',
//         }
//     };
//     return axios.get(REST_API_BASE_URL + "/all-category", config);
// };

export const listCategories = () => {
    return axiosInstance.get('/api/categories/all-category'); // Chú ý rằng baseURL đã được cấu hình
};

export const getCategory = (categoryId) => {
    return axiosInstance.get(`/api/categories/detail-category/${categoryId}`);
};

export const updateCategory = (categoryId, category) => {
    return axiosInstance.put(`/api/categories/edit-category/${categoryId}`, category);
};

export const createCategory = (category) => {
    return axiosInstance.post('/api/categories/add-category', category);
};

export const deleteCategory = (categoryId) => {
    return axiosInstance.delete(`/api/categories/delete-category/${categoryId}`);
};

