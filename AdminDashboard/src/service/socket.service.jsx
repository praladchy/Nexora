import { io } from "socket.io-client";
export const socket = io(import.meta.env.VITE_SOCKET_BACKEND_URL, {
    credentials: true,
});