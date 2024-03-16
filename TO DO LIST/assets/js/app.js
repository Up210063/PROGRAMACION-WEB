document.addEventListener('DOMContentLoaded', () => {
    // Elementos HTML
    const userSelect = document.getElementById('select-users');
    const userContainer = document.getElementById('user-container');
    const taskContainer = document.getElementById('task-container');
    const displayButton = document.getElementById('btndisplay');

    userSelect.addEventListener('change', () => {
        const userId = userSelect.value;

        fetch('informacion/usuarios.json')
            .then(response => response.json())
            .then(users => {
                const selectedUser = users.find(user => user.id == userId);
                updateUserInformation(selectedUser);
            });

        fetch('informacion/tareas.json')
            .then(response => response.json())
            .then(tasks => {
                const userTasks = tasks.filter(task => task.userId == userId);
                updateTaskList(userTasks);
            });
    });

    displayButton.addEventListener('click', () => {
        toggleTaskContainerVisibility();
    });

    function updateUserInformation(user) {
        const nombreCompleto = userContainer.querySelector('ul li:first-child span');
        const emailUsuario = userContainer.querySelector('ul li:nth-child(2) span');
        nombreCompleto.textContent = `${user.firstname} ${user.lastname}`;
        emailUsuario.textContent = user.email;
    }

    function updateTaskList(tasks) {
        const ul = taskContainer.querySelector('ul');
        ul.innerHTML = ''; // Limpiar la lista antes de actualizarla
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${task.title}</span><input type="checkbox" ${task.completed ? 'checked' : ''}>`;
            ul.appendChild(li);
        });
    }

    function toggleTaskContainerVisibility() {
        taskContainer.style.visibility = taskContainer.style.visibility === 'visible' ? 'hidden' : 'visible';
    }
});
