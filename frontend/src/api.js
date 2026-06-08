import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // change if your backend runs on different port
});

export default API;