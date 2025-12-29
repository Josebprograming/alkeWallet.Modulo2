document.addEventListener("DOMContentLoaded", () => {
    const saldoElement = document.getElementById("saldo");
    const sendmoneyForm = document.getElementById("sendmoney-form");
    const destinatarioSelect = document.getElementById("destinatario");

    // Inicializar saldo y transacciones si no existen
    if (!localStorage.getItem("saldo")) {
        localStorage.setItem("saldo", "0");
    }
    if (!localStorage.getItem("transacciones")) {
        localStorage.setItem("transacciones", JSON.stringify([]));
    }

    actualizarSaldoUI();

    sendmoneyForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const amount = parseFloat(document.getElementById("amount").value);
        const destinatario = destinatarioSelect.value;

        if (!amount || amount <= 0) {
            alert("Ingrese una cantidad válida");
            return;
        }
        if (destinatario === "Seleccione") {
            alert("Seleccione un destinatario válido");
            return;
        }

        let saldoActual = parseFloat(localStorage.getItem("saldo"));

        if (amount > saldoActual) {
            alert("Saldo insuficiente");
            return;
        }

        // Actualizar saldo
        saldoActual -= amount;
        localStorage.setItem("saldo", saldoActual.toString());

        // Guardar transacción
        const transacciones = JSON.parse(localStorage.getItem("transacciones"));
        transacciones.push({
            tipo: "Transferencia",
            cantidad: amount,
            destino: destinatario,
            descripcion: `Envío a ${destinatario}`,
            fecha: new Date().toLocaleString()
        });
        localStorage.setItem("transacciones", JSON.stringify(transacciones));

        actualizarSaldoUI();
        alert(`Se enviaron $${amount.toLocaleString("es-CL")} a ${destinatario}`);
        sendmoneyForm.reset();
    });

    function actualizarSaldoUI() {
        const saldoActual = parseFloat(localStorage.getItem("saldo"));
        saldoElement.textContent = `$ Saldo: ${saldoActual.toLocaleString("es-CL")}`;
    }
});