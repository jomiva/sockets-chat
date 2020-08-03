/**
 * Actualizar los modulos de node
 * con el comando "npm install"
 * @JoseValera
 **/

const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const path = require("path");

const app = express();

const server = http.createServer(app);

const publicPath = path.resolve(__dirname, "../public");
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// io = esta es la comunicacion del backend
// Si se ve http://localhost:3000/socket.io/socket.io.js es que todo está bien configurado
module.exports.io = socketIO(server);
// Hay que decirle al server de que utilice este archivo
require("./socket/socket");

server.listen(port, (err) => {
  if (err) throw new Error(err);

  console.log(`Servidor corriendo en puerto ${port}`);
});
