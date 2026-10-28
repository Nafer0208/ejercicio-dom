
let filtro = "todas"

document.addEventListener('DOMContentLoaded', () => {
    const contenedorTareas = document.getElementById('cont-tareas')
    const formulario = document.getElementById('formulario')
    const filtros = document.getElementById('filtros')

    contadoresTarea(contenedorTareas)
    'use strict'

    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            } else {
                event.preventDefault()
                agregrarTarea(contenedorTareas)
                form.classList.remove('was-validated')
                formulario.reset()
                return
            }
            form.classList.add('was-validated')
        }, false)
    })

    /*Eliminar o completar tareas con los botones agregados en estas*/

    contenedorTareas.addEventListener('click', (event) => {
        if (event.target.classList.contains('completar')) { //Completado de tarea
            event.stopPropagation()
            completarTarea(event, contenedorTareas)

        } else if (event.target.classList.contains('eliminar')) { //Eliminacion de tarea
            event.stopPropagation()
            borrarTarea(event, contenedorTareas)
        }

        filtrarTareas(contenedorTareas)
    })

    filtros.addEventListener('click', function (event) {
        event.stopPropagation()

        filtro = event.target.dataset.filtro
        filtrarTareas(contenedorTareas)
    })
})

function agregrarTarea(tareas) {
    const nombre = document.getElementById('nombre-tarea')
    const valorNombre = nombre.value
    const tr = document.createElement('tr')
    tr.classList.add('tarea')
    tr.dataset.estado = 'pendiente'

    tr.innerHTML = `
        <td class = "nombre">${valorNombre}</td>
        <td>
            <div class="btn-group" style="width: 100px;">
                <button class="btn btn-outline-success completar">Completar</button>
                <button class="btn btn-outline-danger eliminar">Eliminar</button>
            </div>
        </td>`

    tareas.appendChild(tr);
    contadoresTarea(tareas)
    filtro = 'todas'
    filtrarTareas(tareas)
}

function contadoresTarea(contenedor) {
    const tareas = contenedor.querySelectorAll('.tarea')
    let todas = 0
    let pendientes = 0
    let completas = 0

    tareas.forEach(t => {
        todas++
        if (t.dataset.estado === 'pendiente') {
            pendientes++
        } else {
            completas++
        }
    });

    contadorTodas.innerHTML = `<strong>${todas}</strong>`
    contadorPendientes.innerHTML = `<strong>${pendientes}</strong>`
    contadorCompletadas.innerHTML = `<strong>${completas}</strong>`
}


function filtrarTareas(contenedor) {
    const tareas = contenedor.querySelectorAll('.tarea')
    let mostrar = false
    tareas.forEach(tarea => {
        if (filtro === "todas") {
            mostrar = true
        } else if (tarea.dataset.estado === filtro) {
            mostrar = true
        } else {
            mostrar = false
        }

        if (mostrar) {
            tarea.style.display = ""
        } else {
            tarea.style.display = "none"
        }
    });
}

function borrarTarea(event, contenedor) {
    const tareaEliminar = event.target.closest('tr')

    if (confirm('¿Desea eliminar esta tarea?')) {
        tareaEliminar.remove()
        contadoresTarea(contenedor)
        filtro = 'todas'
    }
}

function completarTarea(event, contenedor) {
    const tareaCompletar = event.target.closest('tr')
    const nombre = tareaCompletar.querySelector('.nombre')
    const btnCompletar = event.target

    nombre.classList.toggle('text-decoration-line-through')
    nombre.classList.toggle('text-muted')

    if (btnCompletar.textContent === 'Completar') {
        tareaCompletar.dataset.estado = 'completada'
        btnCompletar.textContent = 'Deshacer'
        btnCompletar.classList.replace('btn-outline-success', 'btn-outline-warning')
    } else {
        tareaCompletar.dataset.estado = 'pendiente'
        btnCompletar.textContent = 'Completar'
        btnCompletar.classList.replace('btn-outline-warning', 'btn-outline-success')
    }
    filtro = 'todas'
    contadoresTarea(contenedor)
}