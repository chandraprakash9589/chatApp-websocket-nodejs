import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
const app = express();

const port = 3000;

const httpServer = createServer(app);

//Socket.io
const io = new Server(httpServer);
io.on("connection", (socket) => {
  // console.log("A new User has connected",socket.id)
  socket.on("User-message", (message) => {
    io.emit("message", message);
  });
});
app.use(express.static(path.resolve("./public")));
app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});
httpServer.listen(port, () => console.log(`Server started at port ${port}`));
