const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const notifier = require("node-notifier");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve file HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Handle koneksi socket
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("sendNotification", () => {
    console.log("Sending notification...");
    notifier.notify({
      title: "Notifikasi dari Socket.io",
      message: "Tombol telah diklik!",
      sound: true, // Mac OS X only
      wait: false,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Jalankan server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
