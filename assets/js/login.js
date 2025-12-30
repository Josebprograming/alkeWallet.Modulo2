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

    function showAlert(type, message, delay = 2000) {

      const container = document.querySelector('.container.sm') || document.querySelector('main');
      if (!container) return;


      const existing = container.querySelector('.alert');
      if (existing) {
        existing.parentNode.removeChild(existing);
      }

      const alertDiv = document.createElement('div');
      alertDiv.className = `alert alert-${type}`;
      alertDiv.setAttribute('role', 'alert');
      alertDiv.textContent = message;

      container.insertBefore(alertDiv, container.firstChild);

    
      alertDiv.style.opacity = 1;

      setTimeout(() => {
        fadeOut(alertDiv);
        setTimeout(() => {
          if (alertDiv.parentNode) alertDiv.parentNode.removeChild(alertDiv);
        }, 600);
      }, delay);

      return alertDiv;
    }

    signupBtn.addEventListener("click", () => {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (!email || !password) {
        showAlert('warning', 'Por favor ingrese correo y contraseña');
        return;
      }

      registeredEmail = email;
      registeredPassword = password;
      isRegistered = true;
      fadeOut(signupBtn);
      formTitle.textContent = "Iniciar Sesión";
      showAlert('success', 'Registro exitoso, ahora inicia sesión');
      emailInput.value = "";
      passwordInput.value = "";
    });

    loginBtn.addEventListener("click", () => {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (!isRegistered) {
        showAlert('warning', 'Por favor, registrarse primero');
        return;
      }

      if (email === registeredEmail && password === registeredPassword) {
        showAlert('success', 'Inicio de sesión exitoso, serás redirigido al menu principal');
        setTimeout(() => {
          window.location.href = "menu.html";
        }, 2600);
      } else {
        showAlert('danger', 'Correo o contraseña incorrectos, intente nuevamente');
      }
    });
  });