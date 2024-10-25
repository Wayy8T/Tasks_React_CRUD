import axios from 'axios'

// export const apiLogin = (data) => {
//     return axios({
//         url: `/auth/log-in`,
//         headers: {
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Headers': '*',
//             'Access-Control-Allow-Credentials': 'true'
//         }, 
//         method: "post",
//         data,
//     });
// };   

export const registerService = (data) => {
    const baseUrl = import.meta.env.VITE_REST_API_BASE_URL;
    console.log(baseUrl + "baseUrl")
    return axios.post(`${baseUrl}auth/register`, data);
};

export const loginService = (data) => {
    const baseUrl = import.meta.env.VITE_REST_API_BASE_URL;
    console.log(baseUrl + "baseUrl")
    return axios.post(`${baseUrl}auth/log-in`, data);
};