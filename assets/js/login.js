  document.addEventListener("DOMContentLoaded", () => {
    let registeredEmail = "";
    let registeredPassword = "";
    let isRegistered = false;

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const signupBtn = document.getElementById("Signupbtn");
    const loginBtn = document.getElementById("loginbtn");
    const formTitle = document.getElementById("form-title");

    function fadeOut(element) {
      let opacity = 1;
      const timer = setInterval(() => {
        if (opacity <= 0.1) {
          clearInterval(timer);
          element.style.display = "none";
        }
        element.style.opacity = opacity;
        opacity -= 0.1;
      }, 50);
    }

    signupBtn.addEventListener("click", () => {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (!email || !password) {
        alert("Por favor ingrese correo y contraseña");
        return;
      }

      registeredEmail = email;
      registeredPassword = password;
      isRegistered = true;
      fadeOut(signupBtn);
      formTitle.textContent = "Iniciar Sesión";
      alert("Registro exitoso, ahora inicia sesión");
      emailInput.value = "";
      passwordInput.value = "";
    });
    loginBtn.addEventListener("click", () => {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (!isRegistered) {
        alert("Por favor, registrarse primero");
        return;
      }

      if (email === registeredEmail && password === registeredPassword) {
        alert("Inicio de sesión exitoso");
        window.location.href = "menu.html";
      } else {
        alert("Correo o contraseña incorrectos, intente nuevamente");
      }
    });
  });