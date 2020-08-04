const { io } = require("../server");
const { Usuarios } = require("../classes/usuarios");
const { crearMensaje } = require("../helpers/utilidades");
const usuarios = new Usuarios();
io.on("connection", (client) => {
  client.on("entrarChat", (usuario, callback) => {
    if (!usuario.nombre || !usuario.sala) {
      return callback({
        error: true,
        message: "el nombre y sala son necesarios",
      });
    }

    usuarios.agregarPersona(client.id, usuario.nombre, usuario.sala);

    client.join(usuario.sala);

    client.broadcast
      .to(usuario.sala)
      .emit("listaPersona", usuarios.getPersonasPorSala(usuario.sala));
    client.broadcast
      .to(usuario.sala)
      .emit(
        "crearMensaje",
        crearMensaje("Administrador", `${usuario.nombre} se unió`)
      );
    callback(usuarios.getPersonasPorSala(usuario.sala));
  });

  client.on("crearMensaje", (data, callback) => {
    const persona = usuarios.getPersona(client.id);
    const mensaje = crearMensaje(persona.nombre, data.mensaje);
    client.broadcast.to(persona.sala).emit("crearMensaje", mensaje);

    callback(mensaje);
  });

  client.on("disconnect", () => {
    const personaBorrada = usuarios.borrarPersona(client.id);
    client.broadcast
      .to(personaBorrada.sala)
      .emit(
        "crearMensaje",
        crearMensaje("Administrador", `${personaBorrada.nombre} salió`)
      );
    client.broadcast
      .to(personaBorrada.sala)
      .emit("listaPersona", usuarios.getPersonasPorSala(personaBorrada.sala));
  });

  client.on("mensajePrivado", (data) => {
    const persona = usuarios.getPersona(client.id);
    client.broadcast
      .to(data.para)
      .emit("mensajePrivado", crearMensaje(persona.nombre, data.mensaje));
  });
});
