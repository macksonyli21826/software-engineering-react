import axios from "axios";
// const BASE_URL = "https://cs5500-01-sp22.herokuapp.com/api";
// const BASE_URL = "http://localhost:4000/api";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const SECURITY_API = `${BASE_URL}/api/auth`;

// this function creates an axios instance configured to include
// cookie headers to establish user identity by setting the withCredentials
// property to true
const api = axios.create({
    withCredentials: true
});

// signup is integrated from auth-service.ts, which is the same one
// This function posting the signup middlewhere
// passing the new user data in the HTTP body (user)
// body is expected to include username, password and email
export const signup = (user) =>
    api.post(`${SECURITY_API}/signup`, user)
        .then(response => response.data);
/*
export const register = (user) =>
    api.post(`${SECURITY_API}/register`, user)
        .then(response => response.data);
 */

export const login = (credentials) =>
    api.post(`${SECURITY_API}/login`, credentials)
        .then(response => response.data);

export const logout = (user) =>
    api.post(`${SECURITY_API}/logout`, user)
        .then(response => response.data);

export const profile = () =>
    api.post(`${SECURITY_API}/profile`)
        .then(response => response.data);
