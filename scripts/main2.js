let user = "";
let password = "";

let section = document.getElementById("section");
let link = document.getElementById("link");
let linkNuevo = document.createElement("li");
let nuevo = document.createElement("span");
nuevo.classList.add("error");
section.appendChild(nuevo);
link.appendChild(linkNuevo);

document.getElementById("myForm").addEventListener("submit", (e) => {
  e.preventDefault();

  let usuarioIniciado;
  let user = document.getElementById("usuario").value;
  let password = document.getElementById("password").value;
  let usuariosExistentes = JSON.parse(localStorage.getItem("usuario")) || [];
  if (password !== "" && user !== "") {
    usuarioIniciado = usuariosExistentes.find((usuario) => {
      return usuario.user === user && usuario.password === password;
    });
  } else {
    nuevo.textContent = "Rellene los campos faltantes";
  }
  if (usuarioIniciado) {
    nuevo.classList.add("password");
    nuevo.textContent = `Ya puedes acceder a la calculadora ${user}`;
    linkNuevo.innerHTML = `<a href="./calculadora.html">Calculadora</a>`;
  } else {
    nuevo.textContent = "Su usuario o contraseña son incorrectas";
  }
});
