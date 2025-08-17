const sumar = (a, b) => a + b;
const restar = (a, b) => a - b;
const multiplicar = (a, b) => a * b;
const dividir = (a, b) => a / b;

let entradaActual = "";
let numero1;
let numero2;
let operacionActual;

const pantalla = document.getElementById("pantalla");
const cambiarNumero = document.getElementById("cambiar");

document.querySelectorAll("button[data-numero]").forEach((btn) => {
  btn.addEventListener("click", () => {
    entradaActual += btn.dataset.numero;
    pantalla.textContent = entradaActual;
  });
});

document.getElementById("operaciones").addEventListener("change", () => {
  let seleccion = document.getElementById("operaciones").value;
  switch (seleccion) {
    case "1":
      cambiarNumero.innerText = "+";
      operacionActual = sumar;
      break;
    case "2":
      cambiarNumero.innerText = "-";
      operacionActual = restar;
      break;
    case "3":
      cambiarNumero.innerText = "*";
      operacionActual = multiplicar;
      break;
    case "4":
      cambiarNumero.innerText = "/";
      operacionActual = dividir;
      break;
  }
});

cambiarNumero.addEventListener("click", () => {
  numero1 = Number(entradaActual);
  entradaActual = "";
  pantalla.textContent = `${numero1} ${cambiarNumero.textContent}`;
});

document.getElementById("resultado").addEventListener("click", () => {
  numero2 = Number(entradaActual);
  if (operacionActual && numero1 !== null && !isNaN(numero2)) {
    let resultado = operacionActual(numero1, numero2);
    pantalla.textContent = `${numero1} ${cambiarNumero.textContent} ${numero2} = ${resultado}`;
    entradaActual = "";
    numero1 = null;
    numero2 = null;
  }
});

pantalla.textContent = "0";
cambiarNumero.innerText = "+";
operacionActual = sumar;
