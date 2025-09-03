const sumar = (a, b) => {
  if (isNaN(a) || isNaN(b)) {
    return "Error: Entrada inválida";
  }
  return a + b;
};
const restar = (a, b) => {
  if (isNaN(a) || isNaN(b)) {
    return "Error: Entrada inválida";
  }
  return a - b;
};
const multiplicar = (a, b) => {
  if (isNaN(a) || isNaN(b)) {
    return "Error: Entrada inválida";
  }
  return a * b;
};
const dividir = (a, b) => {
  if (isNaN(a) || isNaN(b)) {
    return "Error: Entrada inválida";
  }
  return a / b;
};
const renderizarHistorial = () => {
  let resultadosGuardados = JSON.parse(localStorage.getItem("resultado")) || [];
  let main = document.getElementById("main");
  let resultados = "";

  resultadosGuardados.forEach((resultado) => {
    resultados += `
      <div class="resultado">
        <h3>${resultado.numero1} ${resultado.operacion} ${resultado.numero2} = ${resultado.resultado}</h3>
        <button class="btn-eliminar button" data-id="${resultado.id}">Borrar</button>
      </div>`;
  });

  main.innerHTML = resultados;

  // Una vez pintado el HTML, asignamos listeners a todos los botones
  document.querySelectorAll(".btn-eliminar").forEach((btn) => {
    btn.addEventListener("click", () => {
      let id = Number(btn.dataset.id);
      botonEliminar(id);
    });
  });
};
renderizarHistorial();

const botonEliminar = (id) => {
  Toastify({
    text: "Eliminado ✔",
    duration: 1000,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
  let resultadosGuardados = JSON.parse(localStorage.getItem("resultado")) || [];
  let resultadosFiltrados = resultadosGuardados.filter(
    (resultado) => resultado.id !== id
  );
  localStorage.setItem("resultado", JSON.stringify(resultadosFiltrados));
  renderizarHistorial();
};

function Resultado(numero1, numero2, operacion, resultado, array) {
  this.id = array.length;
  this.numero1 = numero1;
  this.numero2 = numero2;
  this.operacion = operacion;
  this.resultado = resultado;
}

let operacionActual = null;
let entradaActual = "";
let numero1;
let numero2;

const pantalla = document.getElementById("pantalla");

document.querySelectorAll("button[data-numero]").forEach((btn) => {
  btn.addEventListener("click", () => {
    entradaActual += btn.dataset.numero;
    pantalla.textContent = entradaActual;
  });
});

document.querySelectorAll("button[data-operador]").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (entradaActual === "") return;
    numero1 = Number(entradaActual);
    operacionActual = btn.dataset.operador;
    entradaActual = "";
    pantalla.textContent = `${numero1} ${operacionActual}`;
  });
});

document.getElementById("resultado").addEventListener("click", () => {
  if (entradaActual === "" || numero1 === null || !operacionActual) return;
  Toastify({
    text: "Sucessfull ✔",
    duration: 1000,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();

  numero2 = Number(entradaActual);
  let resultado;
  switch (operacionActual) {
    case "+":
      if (isNaN(numero1) && isNaN(numero2)) {
        pantalla.textContent = "Error: Entrada inválida";
      }
      resultado = sumar(numero1, numero2);
      break;
    case "-":
      resultado = restar(numero1, numero2);
      break;
    case "*":
      resultado = multiplicar(numero1, numero2);
      break;
    case "/":
      if (numero2 === 0) {
        pantalla.textContent = "Error: División por cero";
      }
      resultado = dividir(numero1, numero2);
      break;
  }
  pantalla.textContent = `${numero1} ${operacionActual} ${numero2} = ${resultado}`;

  if (resultado !== "Error: Entrada inválida") {
    let resultList = JSON.parse(localStorage.getItem("resultado")) || [];
    let resultados = new Resultado(
      numero1,
      numero2,
      operacionActual,
      resultado,
      resultList
    );
    resultList.push(resultados);
    localStorage.setItem("resultado", JSON.stringify(resultList));

    entradaActual = "";
    operacionActual = null;
    numero1 = null;
    numero2 = null;
    renderizarHistorial();
  }
});

document.getElementById("btnCE").addEventListener("click", () => {
  if (resultado) {
    return;
  }
  entradaActual = "";
  numero2 = null;
  pantalla.textContent =
    numero1 === undefined ? "0" : `${numero1} ${operacionActual || ""}`;
});

document.getElementById("btnC").addEventListener("click", () => {
  entradaActual = "";
  numero1 = null;
  numero2 = null;
  operacionActual = null;
  pantalla.textContent = "0";
});

document.getElementById("btnBorrar").addEventListener("click", () => {
  entradaActual = entradaActual.slice(0, -1);
  pantalla.textContent = entradaActual || "0";
});

document.getElementById("porcentaje").addEventListener("click", () => {
  if (entradaActual === "") return;
  let valor = Number(entradaActual);

  if (numero1 !== null && operacionActual) {
    valor = (numero1 * valor) / 100;
  } else {
    valor = valor / 100;
  }

  entradaActual = valor.toString();
  pantalla.textContent = entradaActual;
});

pantalla.textContent = "0";

document.getElementById("cerrar").addEventListener("click", (e) => {
  e.preventDefault();
  Swal.fire({
    title: "Do you want to log out?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Log out", "", "success");
      setTimeout(() => {
        window.location.href = "./loggin.html";
      }, 1000);
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });
});
