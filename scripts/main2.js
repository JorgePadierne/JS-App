let section = document.getElementById("section");
let link = document.getElementById("link");
let linkNuevo = document.createElement("li");
let nuevo = document.createElement("span");
nuevo.classList.add("error");
section.appendChild(nuevo);
link.appendChild(linkNuevo);

document.getElementById("myForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const userInput = document.getElementById("usuario").value.trim();
  const passInput = document.getElementById("password").value.trim();

  if (!userInput || !passInput) {
    nuevo.textContent = "Rellene los campos faltantes";
    return;
  }

  const usuariosRemotos = await cargarUsuariosRemotos();
  const usuariosLocales = JSON.parse(
    localStorage.getItem("usuariosExtra") || "[]"
  );
  const todosLosUsuarios = [...usuariosRemotos, ...usuariosLocales];

  const usuarioIniciado = todosLosUsuarios.find(
    (u) => u.username === userInput && u.password === passInput
  );

  if (usuarioIniciado) {
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioIniciado));
    Toastify({
      text: "Sucessfully logged in",
      duration: 2000,
      gravity: "bottom",
      position: "right",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
    linkNuevo.innerHTML = `<a href="./calculadora.html">Calculator</a>`;
  } else {
    Toastify({
      text: "Error: Incorrect user or password",
      duration: 3000,
      gravity: "bottom",
      position: "right",
      style: {
        background: "linear-gradient(to right, #ff5f6d, #ffc371)",
      },
    }).showToast();
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

async function registrar(username, password) {
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

  if (todosLosUsuarios.some((u) => u.username === usernameNorm)) {
    Toastify({
      text: "El usuario ya existe",
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
    }).showToast();
    return;
  }

  usuariosLocales.push({ username: username.trim(), password: password });
  localStorage.setItem("usuariosExtra", JSON.stringify(usuariosLocales));

  Toastify({
    text: "Usuario registrado exitosamente",
    duration: 3000,
    gravity: "top",
    position: "center",
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
  }).showToast();
}
