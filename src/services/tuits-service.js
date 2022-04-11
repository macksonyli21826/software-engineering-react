import axios from "axios"; // use axios library

// const BASE_URL = "https://cs5500-01-sp22.herokuapp.com";
const BASE_URL = process.env.REACT_APP_BASE_URL; // get URL from environment variable

const TUITS_API = `${BASE_URL}/api/tuits`; // URLs to tuits
const USERS_API = `${BASE_URL}/api/users`; // URLs to users

// configure axios to include secure session ID in cookie
const api = axios.create({
    withCredentials: true
});

// function findAllTuitsByUser is called findTuitsByUser in instruction,
// the name is changed due to name convention in node.js

export const findAllTuitsByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/tuits`) // retrieve all tuits posted by user
        .then(response => response.data);

export const findAllTuits = () =>
    api.get(TUITS_API)
        .then(response => response.data);

export const findTuitById = (tid) =>
    api.get(`${TUITS_API}/${tid}`)
        .then(response => response.data);

export const findTuitByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/tuits`)
        .then(response => response.data);

// this function also called createTuitByUser
export const createTuitByUser = (uid, tuit) => // post tuit by user
    api.post(`${USERS_API}/${uid}/tuits`, tuit)
        .then(response => response.data);

export const updateTuit = (tid, tuit) =>
    api.post(`${TUITS_API}/${tid}`, tuit)
        .then(response => response.data);

export const deleteTuit = (tid) =>
    api.delete(`${TUITS_API}/${tid}`)
        .then(response => response.data);
