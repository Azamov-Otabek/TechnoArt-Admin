import axios from "axios";
import { getCookies } from "../utils/cocies";

const http = axios.create({
    baseURL: "http://18.159.214.90/api"
})


http.interceptors.request.use((config) => {
    const token = getCookies("access_token")
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
})

export default http