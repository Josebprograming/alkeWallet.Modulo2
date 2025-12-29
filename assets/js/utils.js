// utils.js
function initStorage() {
  if (!localStorage.getItem("saldo")) {
    localStorage.setItem("saldo", "0");
  }
  if (!localStorage.getItem("transacciones")) {
    localStorage.setItem("transacciones", JSON.stringify([]));
  }
}

function getSaldo() {
  const raw = localStorage.getItem("saldo");
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : 0;
}

function setSaldo(n) {
  localStorage.setItem("saldo", String(Number(n)));
}

function getTransacciones() {
  try {
    const t = JSON.parse(localStorage.getItem("transacciones"));
    return Array.isArray(t) ? t : [];
  } catch {
    return [];
  }
}

function addTransaccion(tx) {
  const transacciones = getTransacciones();
  transacciones.push(tx);
  localStorage.setItem("transacciones", JSON.stringify(transacciones));
}

function actualizarSaldoUI(elementId = "saldo") {
  const saldoActual = getSaldo();
  const el = document.getElementById(elementId);
  if (el) {
    el.textContent = `$ Saldo: ${saldoActual.toLocaleString("es-CL")}`;
  }
}