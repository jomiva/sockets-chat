const socket = io();

// Los on son para escuchar
socket.on("connect", function (data) {
  console.log("conectado al servidor");
});

socket.on("disconnect", function () {
  console.log("perdimos conexion con el servidor");
});

// Los emit son para enviar informacion
socket.emit(
  "enviarMensaje",
  {
    usuario: "fernando",
    mensaje: "hola mundo",
  },
  function (data) {
    console.log("respuesta server", data.resp);
  }
);

socket.on("enviarMensaje", (message) => {
  console.log("Servidor:", message);
});
