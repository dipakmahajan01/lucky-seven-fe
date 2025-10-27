// src/socket.js
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000/v1/cricket";

// Connect once for the entire app
const socket = io(SOCKET_URL, {
  transports: ["websocket"], // ensures faster and more stable connection
  withCredentials: true,
});

export default socket;
