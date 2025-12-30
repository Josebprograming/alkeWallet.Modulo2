document.addEventListener("DOMContentLoaded", () => {
    const sendmoneyForm = document.getElementById("sendmoney-form");
    const destinatarioSelect = document.getElementById("destinatario");

    // Inicializar almacenamiento y mostrar saldo
    initStorage();
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

        let saldoActual = getSaldo();

        if (amount > saldoActual) {
            alert("Saldo insuficiente");
            return;
        }

        // Actualizar saldo
        saldoActual -= amount;
        setSaldo(saldoActual);

        // Guardar transacción con saldoAfter
        addTransaccion({
            tipo: "Transferencia",
            cantidad: amount,
            destino: destinatario,
            descripcion: `Envío a ${destinatario}`,
            fecha: new Date().toLocaleString('es-CL'),
            saldoAfter: saldoActual
        });

        actualizarSaldoUI();
        alert(`Se enviaron $${amount.toLocaleString("es-CL")} a ${destinatario}`);
        sendmoneyForm.reset();
    });
});