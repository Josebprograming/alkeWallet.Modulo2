document.addEventListener("DOMContentLoaded", () => {
    const saldoElement = document.getElementById("saldo");
    const sendmoneyForm = document.getElementById("sendmoney-form");
    const destinatarioSelect = document.getElementById("destinatario");
    const addRecipientBtn = document.getElementById("add-recipient-btn");
    const newRecipientSection = document.getElementById("new-recipient-section");
    const newRecipientNameInput = document.getElementById("new-recipient-name");
    const saveRecipientBtn = document.getElementById("save-recipient-btn");
    const cancelRecipientBtn = document.getElementById("cancel-recipient-btn");

    // Inicializar saldo y transacciones si no existen
    if (!localStorage.getItem("saldo")) {
        localStorage.setItem("saldo", "0");
    }
    if (!localStorage.getItem("transacciones")) {
        localStorage.setItem("transacciones", JSON.stringify([]));
    }
    if (!localStorage.getItem("destinatarios")) {
        localStorage.setItem("destinatarios", JSON.stringify([]));
    }

    actualizarSaldoUI();
    cargarDestinatarios();

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

    function cargarDestinatarios() {
        const destinatariosCustom = JSON.parse(localStorage.getItem("destinatarios")) || [];
        
        // Eliminar destinatarios personalizados previos
        const options = Array.from(destinatarioSelect.options);
        options.forEach(opt => {
            if (opt.dataset.custom === "true") {
                opt.remove();
            }
        });

        // Agregar destinatarios personalizados
        destinatariosCustom.forEach(nombre => {
            const option = document.createElement("option");
            option.value = nombre;
            option.textContent = nombre;
            option.dataset.custom = "true";
            destinatarioSelect.appendChild(option);
        });
    }

    addRecipientBtn.addEventListener("click", () => {
        newRecipientSection.style.display = "block";
        addRecipientBtn.style.display = "none";
        newRecipientNameInput.focus();
    });

    cancelRecipientBtn.addEventListener("click", () => {
        newRecipientSection.style.display = "none";
        addRecipientBtn.style.display = "block";
        newRecipientNameInput.value = "";
    });

    saveRecipientBtn.addEventListener("click", () => {
        const nuevoNombre = newRecipientNameInput.value.trim();
        
        if (!nuevoNombre) {
            alert("Por favor ingrese un nombre válido");
            return;
        }

        const destinatariosCustom = JSON.parse(localStorage.getItem("destinatarios")) || [];
        
        if (destinatariosCustom.includes(nuevoNombre)) {
            alert("Este destinatario ya existe");
            return;
        }

        destinatariosCustom.push(nuevoNombre);
        localStorage.setItem("destinatarios", JSON.stringify(destinatariosCustom));

        cargarDestinatarios();
        destinatarioSelect.value = nuevoNombre;
        
        newRecipientSection.style.display = "none";
        addRecipientBtn.style.display = "block";
        newRecipientNameInput.value = "";
        
        alert(`Destinatario "${nuevoNombre}" agregado exitosamente`);
    });
});