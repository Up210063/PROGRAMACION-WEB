document.addEventListener('DOMContentLoaded', () => {
    // Elementos HTML
    const userSelect = document.getElementById('select-users');
    const userContainer = document.getElementById('user-container');
    const displayButton = document.getElementById('btndisplay');

    userSelect.addEventListener('change', () => {
        const userId = userSelect.value;

        fetch('informacion/usuarios.json')
            .then(response => response.json())
            .then(users => {
                const selectedUser = users.find(user => user.id == userId);
                updateUserInformation(selectedUser);
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

    function toggleTaskContainerVisibility() {
        const taskContainer = document.getElementById('task-container');
        taskContainer.style.visibility = taskContainer.style.visibility === 'visible' ? 'hidden' : 'visible';
    }
});
