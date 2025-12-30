document.addEventListener("DOMContentLoaded", () => {
  const saldoElement = document.getElementById("saldo");
  const transaccionesBody = document.getElementById("transacciones-body");
  const resumenBody = document.getElementById("resumen-body");

  initStorage();
  actualizarUI();

  function actualizarUI() {
    const saldoActual = getSaldo();
    const transacciones = getTransacciones();

    // Actualizar saldo (usando utils)
    actualizarSaldoUI();

    // Limpiar tabla
    transaccionesBody.innerHTML = "";

    let totalIngresos = 0;
    let totalDepositos = 0;
    let totalEgresos = 0;

    // Renderizar transacciones (mostrando Saldo después de cada transacción si está disponible)
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

      const monto = tx.tipo === "Depósito" ? `$${tx.cantidad.toLocaleString("es-CL")}` : `-$${tx.cantidad.toLocaleString("es-CL")}`;
      const saldoDespues = tx.saldoAfter !== undefined ? `$${Number(tx.saldoAfter).toLocaleString("es-CL")}` : "";

      fila.innerHTML = `
        <td>${tx.fecha}</td>
        <td>${tx.tipo}</td>
        <td>${tx.descripcion}</td>
        <td>${monto}</td>
        <td>${saldoDespues}</td>
      `;
      transaccionesBody.appendChild(fila);
    });

    // Resumen (escrito en tabla separada dentro de #transactions-section)
    if (resumenBody) {
      resumenBody.innerHTML = `
        <tr>
          <th>Total Ingresos:</th>
          <td>$${totalIngresos.toLocaleString("es-CL")}</td>
        </tr>
        <tr>
          <th>Total Depósitos:</th>
          <td>$${totalDepositos.toLocaleString("es-CL")}</td>
        </tr>
        <tr>
          <th>Total Egresos:</th>
          <td>-$${totalEgresos.toLocaleString("es-CL")}</td>
        </tr>
        <tr>
          <th>Saldo Neto:</th>
          <td>$${saldoActual.toLocaleString("es-CL")}</td>
        </tr>
      `;
    }
  }
});