import axios from "axios";


const appClient = axios.create({
    baseURL: process.env.API_BASE_URL,
    headers:{"content-type" : "application/json"}
})

export default appClient;