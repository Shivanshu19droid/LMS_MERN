//we make an instance of the axios class, to be used for making all the http requests

import axios from "axios";

const BASE_URL = "https://full-stack-learning-management-system-tgou.onrender.com"; //this is the server url and the env variable can also be used here

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
