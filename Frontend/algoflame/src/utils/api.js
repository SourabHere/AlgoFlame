import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4000",
})

api.defaults.withCredentials=true;

// console.log(process.env.REACT_APP_API_BASE_URL);

export default api;