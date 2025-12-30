// utils.js
function initStorage() {
  if (!localStorage.getItem("saldo")) {
    localStorage.setItem("saldo", "0");
  }
  if (!localStorage.getItem("transacciones")) {
    localStorage.setItem("transacciones", JSON.stringify([]));
  }
  // Limpiar transacciones inválidas al iniciar
  cleanTransacciones();
}

function cleanTransacciones() {
  const raw = localStorage.getItem("transacciones");
  if (!raw) return;
  try {
    const listado = JSON.parse(raw);
    if (!Array.isArray(listado)) return;

    const cleaned = listado.filter(tx => {
      // cantidad debe ser un número finito
      if (tx == null) return false;
      let cantidad = tx.cantidad;
      if (typeof cantidad === 'string') {
        // Eliminar caracteres no numéricos y convertir si es posible
        const num = Number(cantidad.toString().replace(/[^0-9.,-]/g, '').replace(',', '.'));
        if (Number.isFinite(num)) {
          cantidad = num;
        }
      }
      if (!Number.isFinite(Number(cantidad))) return false;

      // descripción debe ser texto útil
      const desc = tx.descripcion;
      if (desc == null) return false;
      const descStr = String(desc).trim();
      if (!descStr) return false;
      // evitar markers como 'undefined' o '[object'
      if (descStr === 'undefined' || descStr.indexOf('[object') !== -1) return false;

      // fecha opcional pero si existe debe ser no vacía
      if (tx.fecha && String(tx.fecha).trim() === '') return false;

      // normalizar campos
      tx.cantidad = Number(cantidad);
      if (tx.saldoAfter !== undefined) tx.saldoAfter = Number(tx.saldoAfter);

      return true;
    });

    // Solo guardar si hubo cambios
    if (cleaned.length !== listado.length) {
      localStorage.setItem("transacciones", JSON.stringify(cleaned));
    }
  } catch (e) {
    // si parse falla, reseteamos a array vacío
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
  if (!tx || typeof tx !== 'object') return false;
  const t = Object.assign({}, tx);
  // Normalizar cantidad
  t.cantidad = Number(t.cantidad);
  if (!Number.isFinite(t.cantidad)) return false;
  // Normalizar descripcion
  t.descripcion = t.descripcion == null ? '' : String(t.descripcion);
  if (!t.descripcion || t.descripcion === 'undefined' || t.descripcion.indexOf('[object') !== -1) return false;
  // Normalizar saldoAfter si existe
  if (t.saldoAfter !== undefined) t.saldoAfter = Number(t.saldoAfter);

  const transacciones = getTransacciones();
  transacciones.push(t);
  localStorage.setItem("transacciones", JSON.stringify(transacciones));
  return true;
}

function clearTransacciones() {
  localStorage.setItem('transacciones', JSON.stringify([]));
}

function actualizarSaldoUI(elementId = "saldo") {
  const saldoActual = getSaldo();
  const el = document.getElementById(elementId);
  if (el) {
    el.textContent = `$ Saldo: ${saldoActual.toLocaleString("es-CL")}`;
  }
}