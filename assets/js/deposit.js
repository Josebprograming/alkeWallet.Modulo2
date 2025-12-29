document.addEventListener("DOMContentLoaded", () => {
  const saldoElement = document.getElementById("saldo");
  const depositForm = document.getElementById("deposit-form");

  // Inicializar saldo si no existe
  if (!localStorage.getItem("saldo")) {
    localStorage.setItem("saldo", "0");
  }
  // Inicializar transacciones si no existe
  if (!localStorage.getItem("transacciones")) {
    localStorage.setItem("transacciones", JSON.stringify([]));
  }

  // Mostrar saldo actual
  actualizarSaldoUI();

  depositForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const amount = parseFloat(document.getElementById("amount").value);
    const method = document.getElementById("method").value;

    if (!amount || amount <= 0) {
      alert("Ingrese una cantidad válida");
      return;
    }
    if (method === "Seleccione un método") {
      alert("Seleccione un método de depósito");
      return;
    }

    // Obtener saldo actual (asegurando número válido)
    let saldoActual = parseFloat(localStorage.getItem("saldo")) || 0;

    // Actualizar saldo
    saldoActual += amount;
    localStorage.setItem("saldo", saldoActual.toString());

    // Guardar transacción
    const transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
    transacciones.push({
      tipo: "Depósito",
      cantidad: amount,
      metodo: method,
      descripcion: `Depósito vía ${method}`,
      fecha: new Date().toLocaleString()
    });
    localStorage.setItem("transacciones", JSON.stringify(transacciones));

    // Actualizar UI
    actualizarSaldoUI();

    alert(`Depósito exitoso de $${amount.toLocaleString("es-CL")} mediante ${method}`);
    depositForm.reset();
  });

  function actualizarSaldoUI() {
    const saldoActual = parseFloat(localStorage.getItem("saldo")) || 0;
    saldoElement.textContent = `$ Saldo: ${saldoActual.toLocaleString("es-CL")}`;
  }
});