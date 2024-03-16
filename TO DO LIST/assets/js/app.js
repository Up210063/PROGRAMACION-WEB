function updateTaskList(tasks) {
    const ul = taskContainer.querySelector('ul');
    ul.innerHTML = ''; // Limpiar la lista antes de actualizarla
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${index + 1}. ${task.title}</span><input type="checkbox" ${task.completed ? 'checked' : ''}>`;
        ul.appendChild(li);
    });
}
