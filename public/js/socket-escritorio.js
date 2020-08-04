const socket = io();

const searchParams = new URLSearchParams(window.location.search);
const label = $("small");
if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("el escritorio es necesario");
}

const escritorio = searchParams.get("escritorio");
console.log(escritorio);

$("h1").text("Escritorio " + escritorio);

$("button").on("click", () => {
  socket.emit("atenderTicket", { escritorio: escritorio }, (resp) => {
    console.log(resp);
    if (resp === "No hay tickets") {
      alert("No hay más tickets");
      label.text("No hay mas tickets");
      return;
    }
    label.text(resp.numero);
  });
});

