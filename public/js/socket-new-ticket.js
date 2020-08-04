/**
 * Comando para la comunicacion activa-activa con el servidor
 * @JoseValera
 **/

const socket = io();
const label = $("#lblNuevoTicket");

socket.on("connect", () => {
  console.log("conectado");
});

socket.on("disconnect", () => {
  console.log("desconectado");
});

socket.on("estadoActual", (data) => {
  label.text(data.actual);
});

/**
 * "siguienteTicket" es el case que se ejecutará en el servidor, null es parámetro que se envía si se quieren enviar datos,
 * la tercera función es un callback que se debe ejecutar en el servidor.... para que se efectúe en el lado del cliente
 * @JoseValera
 **/

$("button").on("click", () => {
  socket.emit("siguienteTicket", null, function (siguienteTicket) {
    label.text(siguienteTicket);
  });
});
