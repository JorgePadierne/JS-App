const comparador = (a, b, section) => {
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
      Toastify({
        text: "Sucessfully registered ✔",
        duration: 1000,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    } else {
      Toastify({
        text: "Error: Passwords do not match",
        duration: 1000,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #ff5f6d, #ffc371)",
        },
      }).showToast();
      break;
    }
  }
};

function Usuario(user, password, array) {
  this.id = array.length;
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

document.getElementById("myForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  let user = document.getElementById("usuario").value.trim();
  let password = document.getElementById("password").value;
  let password2 = document.getElementById("password2").value;

  if (password !== "" && password2 !== "" && user !== "") {
    if (password === password2) {
      const usuarioExiste = await validarUsuarioExistente(user);
      if (usuarioExiste) {
        Toastify({
          text: "El usuario ya existe",
          duration: 3000,
          gravity: "top",
          position: "center",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }).showToast();
        return;
      }

      await registrar(user, password);
      nuevo.textContent = "";
    } else {
      Toastify({
        text: "Error: Las contraseñas no coinciden",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
      }).showToast();
    }
  } else {
    nuevo.textContent = "Rellene los campos faltantes";
  }
});

async function cargarUsuariosRemotos() {
  try {
    const response = await fetch("../data/usuarios.json");
    const usuarios = await response.json();
    return usuarios;
  } catch (error) {
    Toastify({
      text: "Error cargando usuarios remotos",
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
    }).showToast();
    return [];
  }
}

async function login(username, password) {
  const usuariosRemotos = await cargarUsuariosRemotos();
  const usuariosLocales = JSON.parse(
    localStorage.getItem("usuariosExtra") || "[]"
  );
  const todosLosUsuarios = [...usuariosRemotos, ...usuariosLocales];
  const user = todosLosUsuarios.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    localStorage.setItem("usuarioActivo", JSON.stringify(user));
    Toastify({
      text: "Inicio de sesión exitoso",
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    }).showToast();
  } else {
    Toastify({
      text: "Usuario o contraseña incorrectos",
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
    }).showToast();
  }
}

async function validarUsuarioExistente(username) {
  const usernameNorm = username.trim().toLowerCase();
  const usuariosRemotos = await cargarUsuariosRemotos();
  const usuariosLocales = JSON.parse(
    localStorage.getItem("usuariosExtra") || "[]"
  );
  const todosLosUsuarios = [
    ...usuariosRemotos.map((u) => ({
      ...u,
      username: u.username.toLowerCase(),
    })),
    ...usuariosLocales.map((u) => ({
      ...u,
      username: u.username.toLowerCase(),
    })),
  ];

  return todosLosUsuarios.some((u) => u.username === usernameNorm);
}

async function registrar(username, password) {
  const usuariosLocales = JSON.parse(
    localStorage.getItem("usuariosExtra") || "[]"
  );

  usuariosLocales.push({ username: username.trim(), password });
  localStorage.setItem("usuariosExtra", JSON.stringify(usuariosLocales));

  Toastify({
    text: "Usuario registrado exitosamente",
    duration: 3000,
    gravity: "top",
    position: "center",
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
  }).showToast();
}
