const { io } = require("../server");

io.on("connection", (client) => {
  console.log("se conectó alguien");

  client.on("disconnect", function () {
    console.log("usuario desconectado");
  });

  // Escuchar cliente
  client.on("enviarMensaje", function (data, callback) {
    console.log(data);
    client.emit("enviarMensaje", data);

    client.broadcast.emit("enviarMensaje", data);

    // if (message.usuario) {
    //   callback({
    //     resp: "todo salió bien",
    //   });
    // }
    // callback({
    //   resp: "todo salió mal!!!!!!!!!",
    // });
  });

  client.emit("enviarMensaje", {
    usuario: "admin",
    mensaje: "bienvenido a esta aplicacion",
  });
});
