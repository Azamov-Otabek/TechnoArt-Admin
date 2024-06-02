import axios from "axios";
import { getCookies } from "../utils/cocies";

const http = axios.create({
    baseURL: "http://18.159.214.90/api"
})


http.interceptors.request.use((config) => {
    const token = getCookies("token")
    if (token) {
        config.headers["Authorization"] = token
    }
    return config
})

export default http