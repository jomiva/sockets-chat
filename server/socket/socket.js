const { io } = require("../server");
const { TicketControl } = require("../classes/ticket-control");

const ticketControl = new TicketControl();

io.on("connection", (client) => {
  /**
   * "siguienteTicket hace match con el .emit" data es la informacion que se recibe y callback se debe ejecutar
   *  para efectuar dicha función
   * en el lado del cliente
   * @JoseValera
   **/

  client.on("siguienteTicket", (data, callback) => {
    const siguiente = ticketControl.siguiente();
    console.log(siguiente);
    callback(siguiente);
  });

  /**
   * el segundo argumento es la data que queremos enviar al cliente
   * @JoseValera
   **/

  client.emit("estadoActual", {
    actual: ticketControl.getUltimoTicket(),
    ultimos4: ticketControl.getUltimos4(),
  });

  client.on("atenderTicket", (data, callback) => {
    if (!data.escritorio) {
      return callback({
        err: true,
        mensaje: "el escritorio es necesario",
      });
    }

    let atenderTicket = ticketControl.atenderTicket(data.escritorio);
    
    try {
      console.log("hola");
      client.broadcast.emit("actualizaEstado", {
        ultimos4: ticketControl.getUltimos4(),
      });
    } catch (error) {
      console.log(error);
    }

    callback(atenderTicket);

    // actualizar/notificar cambios en los ultimos 4
  });
});
