const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("message", (data) => {
    console.log(`Received message: ${data}`);
    io.emit("message", data); // Broadcast message
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`WebSocket Server running on port ${PORT}`);
});
