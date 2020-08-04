/**
 * Funciones para renderizar usuarios
 *************************************@JoseValera
 **/
var params = new URLSearchParams(window.location.search);

// referencias de jquery
const divUsuarios = $("#divUsuarios");
const formEnviar = $("#form-enviar");
const txtMensaje = $("#txtMensaje");
const divChatbox = $("#divChatbox");

function renderizarUsuarios(personas) {
  console.log(personas);
  let html = "";
  html += "<li >";
  html +=
    '<a href="javascript:void(0)" class="active"> Chat de <span> ' +
    params.get("sala") +
    "</span> </a>";
  html += "</li>";
  for (let i = 0; i < personas.length; i++) {
    html += "<li>";
    html +=
      '<a data-id = "' +
      personas[i].id +
      '"href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' +
      personas[i].nombre +
      ' <small class="text-success">online</small></span></a>';
    html += "</li>";
  }
  divUsuarios.html(html);
}

function renderizarMensaje(mensaje, yo) {
  let html = "";
  const fecha = new Date(mensaje.fecha);
  const hora = fecha.getHours() + ":" + fecha.getMinutes();
  let adminClass = "info";
  if (mensaje.nombre === "Administrador") {
    adminClass = "danger";
  }
  if (yo) {
    html += '<li class="reverse">';
    html += '  <div class="chat-content">';
    html += "    <h5>" + mensaje.nombre + "</h5>";
    html +=
      '    <div class="box bg-light-inverse">' + mensaje.mensaje + "</div>";
    html += "  </div>";
    html += '  <div class="chat-img">';
    html += '    <img src="assets/images/users/5.jpg" alt="user" />';
    html += "  </div>";
    html += '  <div class="chat-time">' + hora + "</div>";
    html += "</li>";
  } else {
    html += "<li class='animated fadeIn'>";
    if (mensaje.nombre !== "Administrador") {
      html += '  <div class="chat-img">';
      html += '    <img src="assets/images/users/1.jpg" alt="user" />';
      html += "  </div>";
    }
    html += '  <div class="chat-content">';
    html += "    <h5>" + mensaje.nombre + "</h5>";
    html += '    <div class="box bg-light-' + adminClass + '">';
    html += "" + mensaje.mensaje + "";
    html += "    </div>";
    html += "  </div>";
    html += '  <div class="chat-time">' + hora + "</div>";
    html += "</li>";
  }

  divChatbox.append(html);
}

function scrollBottom() {
  // selectors
  var newMessage = divChatbox.children("li:last-child");

  // heights
  var clientHeight = divChatbox.prop("clientHeight");
  var scrollTop = divChatbox.prop("scrollTop");
  var scrollHeight = divChatbox.prop("scrollHeight");
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight() || 0;

  if (
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight
  ) {
    divChatbox.scrollTop(scrollHeight);
  }
}

// listeners
divUsuarios.on("click", "a", function () {
  const id = $(this).data("id");
  console.log(id);
});

formEnviar.on("submit", function (e) {
  e.preventDefault();
  console.log();
  if (txtMensaje.val().trim().length === 0) {
    return;
  }

  //   Enviar información
  socket.emit(
    "crearMensaje",
    {
      nombre: params.get("nombre"),
      mensaje: txtMensaje.val(),
    },
    function (resp) {
      txtMensaje.val("").focus();
      renderizarMensaje(resp, true);
      scrollBottom();
    }
  );
});
