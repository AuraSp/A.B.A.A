import axios from 'axios';

const axiosLog = axios.create({
    baseURL: 'http://localhost:3000/api/v1/logs',
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

axiosLog.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        let res = error.response;
        console.error(res.status);
        return Promise.reject(error);
    }
);

export default axiosLog;