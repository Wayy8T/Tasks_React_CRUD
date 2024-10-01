import axios from 'axios'
const REST_API_BASE_URL = 'http://localhost:8080/auth/log-in';

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

export const loginService = (data) => {
    return axios.post(REST_API_BASE_URL, data)
};