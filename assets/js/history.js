document.addEventListener("DOMContentLoaded", () => {
  const saldoElement = document.getElementById("saldo");
  const transaccionesBody = document.getElementById("transacciones-body");
  const resumenElement = document.getElementById("resumen");

  initStorage();
  actualizarUI();

  function actualizarUI() {
    const saldoActual = getSaldo();
    const transacciones = getTransacciones();

    // Actualizar saldo
    saldoElement.textContent = `$ Saldo: ${saldoActual.toLocaleString("es-CL")}`;

    // Limpiar tabla
    transaccionesBody.innerHTML = "";

    let totalIngresos = 0;
    let totalDepositos = 0;
    let totalEgresos = 0;

    // Renderizar transacciones
    transacciones.forEach(tx => {
      const fila = document.createElement("tr");

      if (tx.tipo === "Depósito") {
        fila.classList.add("table-success");
        totalIngresos += tx.cantidad;
        totalDepositos += tx.cantidad;
      } else if (tx.tipo === "Transferencia" || tx.tipo === "Envío") {
        fila.classList.add("table-danger");
        totalEgresos += tx.cantidad;
      }

      fila.innerHTML = `
        <td>${tx.fecha}</td>
        <td>${tx.tipo}</td>
        <td>${tx.descripcion}</td>
        <td>${tx.tipo === "Depósito" ? "$" + tx.cantidad.toLocaleString("es-CL") : "-$" + tx.cantidad.toLocaleString("es-CL")}</td>
        <td>Completado</td>
      `;
      transaccionesBody.appendChild(fila);
    });

    // Resumen
    resumenElement.innerHTML = `
      <tr>
        <th colspan="3">Total Ingresos:</th>
        <th>$${totalIngresos.toLocaleString("es-CL")}</th>
      </tr>
      <tr>
        <th colspan="3">Total Depósitos:</th>
        <th>$${totalDepositos.toLocaleString("es-CL")}</th>
      </tr>
      <tr>
        <th colspan="3">Total Egresos:</th>
        <th>-$${totalEgresos.toLocaleString("es-CL")}</th>
      </tr>
      <tr>
        <th colspan="3">Saldo Neto:</th>
        <th>$${saldoActual.toLocaleString("es-CL")}</th>
      </tr>
    `;
  }
});