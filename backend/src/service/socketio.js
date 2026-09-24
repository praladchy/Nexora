import { Server } from "socket.io";
import jwt from "jsonwebtoken";
export const SocketIO = (server) => {
  try {
    const io = new Server(server, {
      cors: {
        origin: [
          "https://nexora11.vercel.app",
          "https://nexora-39iv.vercel.app",
          "https://nexora-pralad1.vercel.app",
          "http://localhost:5173",
          "http://localhost:5174",
        ],
        creadentials: true,
      },
    });

    io.use((socket, next) => {
      try {
        const token = socket.handshake.auth?.accessToken;
        // console.log('token',token)
        if (!token) return next(new Error("Authentication error"));
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = decode.userId;
        next();
      } catch (error) {
        console.log("socket Middleware Error", error);
      }
    });

    io.on("connection", (socket) => {
      console.log(`server conneccted ${socket.id}`);
      socket.emit("welcome", {
        message: "welcome in Nexora",
      });
      socket.join(`user:${socket.user}`);
      socket.on("disconnect", (reason) => {
        console.log(`server disconneccted ${socket.id}`);
      });
    });
    return io;
  } catch (error) {
    console.log("error presents in socket", error);
  }
};
