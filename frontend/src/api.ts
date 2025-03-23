import axios from "axios"

export const api = axios.create({
    baseURL: 'http://192.168.14.192:8000/api/v1/gyrat'
})

