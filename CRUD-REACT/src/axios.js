import axios from "axios";
const instance = axios.create({
    baseURL: "http://localhost:8080",
});
instance.interceptors.request.use(
    function (config) {
        let localStore = window.localStorage.getItem("persist:user");
        if (localStore && typeof localStore === "string") {
            localStore = JSON.parse(localStore);
            const token = JSON.parse(localStore?.token);
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        } else return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        return error.response.data;
    }
);
export default instance;