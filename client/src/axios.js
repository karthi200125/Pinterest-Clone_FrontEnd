import axios from "axios";

export const makeRequest = axios.create({
    baseURL:'https://pinterest-z3bd.onrender.com/api/'    
})

