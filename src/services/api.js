import axios from "axios";

export const api = axios.create({
    baseURL: "https://apicriadocstologado.onrender.com/",  //"http://127.0.0.1:5000/",
    timeout: 20000,
    headers: { "Content-Type": "application/json" },
  });
