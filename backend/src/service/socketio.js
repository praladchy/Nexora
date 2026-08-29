import { Server } from "socket.io";
export const socketIo = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`User Connected ${socket.id}`);
    io.emit("welcome", "welcome in Nexora");
    io.on("message", (data) => {
      console.log("received message", data);
    });

    io.on("disconnected", () => {
      console.log(`user disconnected ${socket.id}`);
    });
  });
};
