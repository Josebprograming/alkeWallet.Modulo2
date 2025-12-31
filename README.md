# Alke Wallet - Billetera Digital

## Descripción
Alke Wallet es una aplicación web de billetera digital que permite a los usuarios gestionar sus finanzas de manera sencilla. Los usuarios pueden registrarse, depositar dinero, enviar transferencias y consultar su historial de transacciones.

## Tecnologías Utilizadas
- **HTML5**: Estructura de las páginas web
- **CSS3**: Estilos personalizados y diseño responsive
- **Bootstrap 5.0.2**: Framework CSS para diseño y componentes
- **JavaScript**: Lógica de la aplicación
- **LocalStorage**: Almacenamiento local de datos del usuario

## Guía de Navegación

### 1. Página de Inicio
Al abrir la aplicación, encontrarás la pantalla de bienvenida con el logo de Alke Wallet y un botón "Ingresar al sistema".

### 2. Registro e Inicio de Sesión
- **Registrarse**: Ingresa un correo electrónico y contraseña, luego haz clic en "Registrarse"
- **Iniciar Sesión**: Después del registro, usa las mismas credenciales para iniciar sesión
- Una vez autenticado, serás redirigido al menú principal

### 3. Menú Principal
Desde el menú principal tienes acceso a tres funcionalidades:
- **Depositar**: Agregar fondos a tu billetera
- **Enviar dinero**: Transferir dinero a otros usuarios
- **Historial de transacciones**: Ver todas tus transacciones

### 4. Depositar Dinero
- Ingresa la cantidad que deseas depositar (máximo $500,000)
- Selecciona un método de depósito (Tarjeta de Crédito, Transferencia Bancaria o PayPal)
- Confirma el depósito y tu saldo se actualizará automáticamente

### 5. Enviar Dinero
- Selecciona un destinatario de la lista
- Ingresa la cantidad a enviar
- El sistema verificará que tengas saldo suficiente antes de completar la transferencia

### 6. Historial de Transacciones
- Visualiza todas tus transacciones con detalles de fecha, tipo, descripción y monto
- Consulta el resumen con totales de ingresos, depósitos, egresos y saldo neto
- Las transacciones se muestran en verde (depósitos) y rojo (transferencias)

## Características
✅ Sistema de registro e inicio de sesión  
✅ Gestión de saldo en tiempo real  
✅ Depósitos con múltiples métodos de pago  
✅ Transferencias a contactos predefinidos  
✅ Historial completo de transacciones  
✅ Diseño responsive adaptado a dispositivos móviles  
✅ Persistencia de datos con LocalStorage

## Instalación y Uso
1. Clona o descarga el repositorio
2. Abre el archivo `index.html` en tu navegador
3. O utiliza un servidor local (Live Server en VS Code o Python HTTP Server)

## Notas
- Los datos se almacenan localmente en tu navegador (LocalStorage)
- Esta es una aplicación de demostración educativa
- No utiliza backend ni base de datos real