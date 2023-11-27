import axios from "axios";

export const api = axios.create({
    baseURL: "https://api.render.com/deploy/srv-clgejc6g1b2c73a85jtg?key=IZIwus7UdQk/",  //"http://127.0.0.1:5000/",
    timeout: 3000,
    headers: { "Content-Type": "application/json" },
  });
