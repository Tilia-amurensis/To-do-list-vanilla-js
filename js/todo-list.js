import { activeList, taskLists } from "./tasks-list.js";
import { showAlert } from "./alert.js";
import { getTasks } from "./api.js";
import { addTask } from "./api.js";
const todoTasks = document.querySelector(".tasks");
const todoTitle = document.querySelector(".list-title");
const inputTodo = document.querySelector(".new.task");
const buttonCreateTodo = document.querySelector(".todo-body .btn.create");
const API_URL = "http://localhost:5000/todos";
// Оновлює відображення завдань
export async function updateTodoList(listName) {
  todoTasks.innerHTML = "";
  todoTitle.textContent = listName;

  const tasks = await getTasks(listName); // Отримати завдання з сервера

  tasks.forEach((task, index) => {
    const taskElement = document.createElement("li");
    taskElement.classList.add("task-item");

    const taskText = document.createElement("span");
    taskText.textContent = task;
    taskElement.appendChild(taskText);

    const completedSecondButton = document.createElement("button");
    completedSecondButton.innerHTML = '<i class="bi bi-check2-square"></i>';
    completedSecondButton.classList.add("complete-btn");
    completedSecondButton.addEventListener("click", () => {
      taskElement.classList.toggle("completed");
    });

    const deletedSecondButton = document.createElement("button");
    deletedSecondButton.innerHTML = '<i class="bi bi-trash3"></i>';
    deletedSecondButton.classList.add("delete-btn");
    deletedSecondButton.addEventListener("click", async () => {
      await deleteTask(listName, index); // Видалити завдання через API
      updateTodoList(listName); // Оновити відображення
    });

    taskElement.appendChild(completedSecondButton);
    taskElement.appendChild(deletedSecondButton);
    todoTasks.appendChild(taskElement);
  });

  updateTaskCount();
}

// Оновлює кількість завдань
export function updateTaskCount() {
  if (!activeList || !taskLists[activeList]) return;

  const taskCount = taskLists[activeList].length;
  const taskCountElement = document.querySelector(".task-count");

  if (taskCountElement) {
    taskCountElement.textContent = `${taskCount} tasks remaining`;
  }
}

// Додає нове завдання
buttonCreateTodo.addEventListener("click", async function (event) {
  event.preventDefault();

  const taskValue = inputTodo.value.trim();
  if (!activeList) {
    showAlert("Please select a list first!", "#f44336");
    return;
  }

  if (taskValue === "") {
    showAlert("Please enter a task name!", "#f44336");
    return;
  }

  await addTask(activeList, taskValue); // Додаємо через сервер
  inputTodo.value = "";

  updateTodoList(activeList);
});