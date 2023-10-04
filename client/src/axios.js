import axios from "axios";

export const makeRequest = axios.create({
    baseURL:'https://pinterestapii.onrender.com/api/'
})

