document.addEventListener('DOMContentLoaded', () => {

    const tareas = document.getElementById('tareas')
    const formulario = document.getElementById('formulario')
    const filtros = document.getElementById('filtros')

    'use strict'

    const forms = document.querySelectorAll('.needs-validation')

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            } else {
                event.preventDefault()
                agregrarTarea(tareas, formulario)
                form.classList.remove('was-validated')
                formulario.reset()
                return
            }

            form.classList.add('was-validated')
        }, false)
    })



    /*Eliminar o completar tareas con los botones agregados en estas*/

    tareas.addEventListener('click', (event) => {
        if (event.target.classList.contains('completar')) { //Completado de tarea
            event.stopPropagation()
            const tareaCompletar = event.target.closest('tr')
            const nombre = tareaCompletar.querySelector('.nombre')
            const btnCompletar = event.target

            if (nombre) { //cambio de estilo al nombre de la tarea que se podra completar y descompletar
                nombre.classList.toggle('text-decoration-line-through')
                nombre.classList.toggle('text-muted')
            }

            if (btnCompletar.textContent === 'Completar') {
                tareaCompletar.classList.replace('pendiente','completada')
                btnCompletar.textContent = 'Deshacer'
                btnCompletar.classList.replace('btn-outline-success','btn-outline-warning')
            } else {
                tareaCompletar.classList.replace('completada','pendiente')
                btnCompletar.textContent = 'Completar'
                btnCompletar.classList.replace('btn-outline-warning', 'btn-outline-success')
            }
        } else if (event.target.classList.contains('eliminar')) { //Eliminacion de tarea
            event.stopPropagation()
            const tareaEliminar = event.target.closest('tr')

            if (confirm('¿Desea eliminar esta tarea?')) {
                tareaEliminar.remove()
            }
        }
    })

    filtros.addEventListener('click', function (event) {
        const tareasPantalla = tareas.querySelectorAll('tr')
        if (event.target.textContent === 'Todas') {
            event.stopPropagation()
            tareasPantalla.forEach(tarea => {
                tarea.style.display = ""
            })
        } else if (event.target.textContent === 'Pendientes') {
            tareasPantalla.forEach(tarea => {
                if (tarea.classList.contains('pendiente')) {
                    tarea.style.display = ""
                } else {
                    tarea.style.display = 'none'
                }
            })
        } else {
            tareasPantalla.forEach(tarea => {
                if (tarea.classList.contains('completada')) {
                    tarea.style.display = ""
                } else {
                    tarea.style.display = 'none'
                }
            })
        }
    })
})

function agregrarTarea(tareas) {
    const nombre = document.getElementById('nombre-tarea')
    const valorNombre = nombre.value
    const tr = document.createElement('tr')
    tr.classList.add('pendiente')

    tr.innerHTML = `
        <td class = "nombre">${valorNombre}</td>
        <td>
            <div class="btn-group">
                <button class="btn btn-outline-success completar">Completar</button>
                <button class="btn btn-outline-danger eliminar">Eliminar</button>
            </div>
        </td>`

    tareas.appendChild(tr);
}


