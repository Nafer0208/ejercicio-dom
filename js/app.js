document.addEventListener('DOMContentLoaded', () => {

    const tareas = document.getElementById('tareas')
    const formulario = document.getElementById('formulario')
    // Example starter JavaScript for disabling form submissions if there are invalid fields

    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
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
            }

            form.classList.add('was-validated')
        }, false)
    })

})

function agregrarTarea(tareas) {
    const nombre = document.getElementById('nombre-tarea')
    const valorNombre = nombre.value
    const tr = document.createElement('tr')

    tr.innerHTML = `
        <td>${valorNombre}</td>
        <td>
            <div class="btn-group">
                <button class="btn btn-outline-success">Completar</button>
                <button class="btn btn-outline-danger">Eliminar</button>
            </div>
        </td>`

    tareas.appendChild(tr);
}
