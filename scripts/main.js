const comparadorDePassword = (a, b, section) => {
  let flag = true;
  let mensajeError = section.querySelector(".error-password");
  if (!mensajeError) {
    mensajeError = document.createElement("span");
    mensajeError.classList.add("error-password");
    section.appendChild(mensajeError);
  }
  while (flag) {
    if (a == b) {
      flag = false;
      mensajeError.classList.add("password");
      mensajeError.textContent = `Su cuenta ha sido creada con exito`;
    } else {
      mensajeError.textContent = "Las contraseñas no coinciden";
      break;
    }
  }
};

function Usuario(user, password, array) {
  id = array.length;
  this.user = user;
  this.password = password;
}

let user = "";
let password = "";
let password2 = "";

let section = document.getElementById("section");
let nuevo = document.createElement("span");
nuevo.classList.add("error");
section.appendChild(nuevo);

document.getElementById("myForm").addEventListener("submit", (e) => {
  e.preventDefault();

  let user = document.getElementById("usuario").value;
  let password = document.getElementById("password").value;
  let password2 = document.getElementById("password2").value;

  if (password !== "" && password2 !== "" && user !== "") {
    comparadorDePassword(password, password2, section);
    nuevo.textContent = "";
  } else {
    nuevo.textContent = "Rellene los campos faltantes";
  }

  let cuentaDelUsuario = JSON.parse(localStorage.getItem("usuario")) || [];
  let usuario = new Usuario(user, password, cuentaDelUsuario);
  cuentaDelUsuario.push(usuario);
  localStorage.setItem("usuario", JSON.stringify(cuentaDelUsuario));
});
