import { deleteTask, createTask, getAllUsers, getTaskUsingUserID, getTask, updateTask } from "./requests.js";

const listUsers = document.getElementById('users');
const taskTable = document.getElementById('tasks');
const taskForm = document.getElementById('form-task');
const completedCheckbox = document.getElementById('completed');
const submitButton = document.getElementById('insert');

document.addEventListener('DOMContentLoaded', async () => {
  const allUsers = await getAllUsers();
  listUsers.innerHTML = allUsers.map(user => `<option value="${user.id}">${user.fullname}</option>`).join('');
});

listUsers.addEventListener('change', async () => {
  const userTasks = await getTaskUsingUserID(listUsers.value);
  renderTasks(userTasks);
});

taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(taskForm);
  const completedValue = completedCheckbox.checked ? 1 : 0;
  formData.append('completed', completedValue);

  const taskId = submitButton.dataset.taskId;
  if (taskId) {
    await updateTask(formData, taskId);
  } else {
    await createTask(formData);
  }

  const userTasks = await getTaskUsingUserID(listUsers.value);
  renderTasks(userTasks);

  taskForm.reset();
});

function renderTasks(tasks) {
  const tableBody = taskTable.querySelector('tbody');
  tableBody.innerHTML = tasks.map(task => `
    <tr id="tablerow${task.id}">
      <td>${task.id}</td>
      <td>${task.firstname}</td>
      <td>${task.title}</td>
      <td>${task.completed ? 'Completada' : 'No completada'}</td>
      <td>
        <button class="btn btn-info btn-sm updateBtn" data-task-id="${task.id}">Update</button>
        <button class="btn btn-danger btn-sm deleteBtn" data-task-id="${task.id}">Delete</button>
      </td>
    </tr>
  `).join('');

  addDeleteButtonEvents();
  addUpdateButtonEvents();
}

function addDeleteButtonEvents() {
  const deleteButtons = document.querySelectorAll('.deleteBtn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const taskId = button.dataset.taskId;
      await deleteTask(taskId);
      const userTasks = await getTaskUsingUserID(listUsers.value);
      renderTasks(userTasks);
    });
  });
}

function addUpdateButtonEvents() {
  const updateButtons = document.querySelectorAll('.updateBtn');
  updateButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const taskId = button.dataset.taskId;
      const task = await getTask(taskId);
      taskForm.title.value = task.title;
      completedCheckbox.checked = task.completed;
      submitButton.innerText = 'Update';
      submitButton.dataset.taskId = taskId;
    });
  });
}
