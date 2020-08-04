const socket = io();

const params = new URLSearchParams(window.location.search);

if (!params.has("nombre") || !params.has("sala")) {
  window.location = "index.html";
  throw new Error("el nombre y sala son necesario");
}

const usuario = {
  nombre: params.get("nombre"),
  sala: params.get("sala"),
};

// Los on son para escuchar
socket.on("connect", function () {
  console.log("conectado al servidor");
  socket.emit("entrarChat", usuario, (resp) => {
    console.log("Usuarios conectados: ", resp);
  });
});

socket.on("disconnect", function () {
  console.log("perdimos conexion con el servidor");
});

// Los emit son para enviar informacion

// socket.emit(
//   "crearMensaje",
//   {
//     usuario: "fernando",
//     mensaje: "hola mundo",
//   },
//   function (data) {
//     console.log("respuesta server", data.resp);
//   }
// );

socket.on("crearMensaje", (data) => {
  console.log("Servidor:", data);
});

// Cuando un usuario entra o sale del chat

socket.on("listaPersona", (personas) => {
  console.log("Servidor:", personas);
});

// Mensajes privados
socket.on("mensajePrivado", (mensaje) => {
  console.log("mensaje privado: ", mensaje);
});
