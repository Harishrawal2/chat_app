const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index");
});

const { Server } = require("socket.io"); //SERVER CONNECTION
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("msgSent", (data) => {
    io.emit("msg_rcvd", {
      msg: data.msg,
      userName: data.userName,
    });
  });
});

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`Server Connection Successfully http://localhost:${PORT}`);
});
