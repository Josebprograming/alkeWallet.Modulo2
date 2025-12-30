document.addEventListener("DOMContentLoaded", () => {
  const depositForm = document.getElementById("deposit-form");

  // Inicializar almacenamiento y mostrar saldo
  initStorage();
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

    // Actualizar saldo usando utils
    let saldoActual = getSaldo();
    saldoActual += amount;
    setSaldo(saldoActual);

    // Guardar transacción con saldoAfter
    addTransaccion({
      tipo: "Depósito",
      cantidad: amount,
      metodo: method,
      descripcion: `Depósito vía ${method}`,
      fecha: new Date().toLocaleString('es-CL'),
      saldoAfter: saldoActual
    });

    // Actualizar UI
    actualizarSaldoUI();

    alert(`Depósito exitoso de $${amount.toLocaleString("es-CL")} mediante ${method}`);
    depositForm.reset();
  });
});