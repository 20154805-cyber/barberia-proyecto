// Arreglo global para almacenar las reservas
const reservas = [];

// Variable para guardar el precio del servicio seleccionado en el momento
let precioServicioActual = 0;

/**
 * Función para cargar el servicio seleccionado directamente en el formulario
 */
function seleccionarServicio(nombreServicio, precio) {
    const inputServicio = document.getElementById('servicio-seleccionado');
    inputServicio.value = `${nombreServicio} ($${precio.toFixed(2)})`;
    precioServicioActual = precio;
}

// Escuchar el evento Submit del formulario de reserva
document.getElementById('form-reserva').addEventListener('submit', function (e) {
    e.preventDefault(); // Evitar que se recargue la página

    const servicioTexto = document.getElementById('servicio-seleccionado').value;
    const cliente = document.getElementById('nombre-cliente').value.trim();
    const fecha = document.getElementById('fecha-turno').value;
    const hora = document.getElementById('hora-turno').value;

    // Validación extra
    if (!servicioTexto) {
        alert('Por favor, selecciona primero un servicio del catálogo.');
        return;
    }

    // Crear el objeto de la cita
    const nuevaReserva = {
        id: Date.now(),
        servicio: servicioTexto,
        cliente: cliente,
        fecha: fecha,
        hora: hora
    };

    // Agregar al arreglo
    reservas.push(nuevaReserva);

    // Actualizar la interfaz (DOM)
    renderizarReservas();

    // Limpiar el formulario
    document.getElementById('form-reserva').reset();
    document.getElementById('servicio-seleccionado').value = '';
    alert('¡Tu turno ha sido reservado con éxito!');
});

/**
 * Muestra el listado de turnos dinámicamente en el DOM
 */
function renderizarReservas() {
    const listaElemento = document.getElementById('lista-citas');
    const contadorElemento = document.getElementById('count-citas');

    listaElemento.innerHTML = '';

    if (reservas.length === 0) {
        listaElemento.innerHTML = '<li>No hay reservas agendadas aún.</li>';
        contadorElemento.textContent = '0';
        return;
    }

    // Recorrer las reservas y agregarlas al HTML
    reservas.forEach((reserva) => {
        const item = document.createElement('li');
        item.innerHTML = `<strong>${reserva.cliente}</strong> - ${reserva.servicio} <br> 
                          📅 Fecha: ${reserva.fecha} | ⏰ Hora: ${reserva.hora}`;
        listaElemento.appendChild(item);
    });

    // Actualizar el contador del menú
    contadorElemento.textContent = reservas.length;
}