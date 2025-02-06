import { updateTodoList } from "./todo-list.js";
import { showAlert } from "./alert.js";
import { createTaskList } from "./api.js";
import { deleteTaskList } from "./api.js";
const taskList = document.querySelector(".task-list"); // Список <ul>
const inputField = document.querySelector(".new.list"); // Поле для введення нового списку
const buttonCreateTasks = document.querySelector(".all-tasks .btn.create"); // Кнопка додавання нового списку
export let activeList = null;
export const taskLists = {};

buttonCreateTasks.addEventListener("click", addTasks);
taskList.addEventListener("click", deleteCheck);
taskList.addEventListener("click", handleListClick);
// Додає новий список
export async function addTasks(event) {
  event.preventDefault();
  const inputValue = inputField.value.trim();

  if (inputValue === "") {
    showAlert("Please enter a list name!");
    return;
  }

  await createTaskList(inputValue); // Додаємо список на сервер
  inputField.value = "";

  updateTaskLists(); // Оновлюємо списки
}

async function updateTaskLists() {
  const lists = await getTaskLists();
  taskList.innerHTML = "";
  lists.forEach((listName) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("list-container");

    const newTask = document.createElement("li");
    newTask.innerText = listName;
    newTask.classList.add("list-name");
    newTask.addEventListener("click", () => {
      activeList = listName;
      updateTodoList(activeList);
    });

    taskDiv.appendChild(newTask);
    taskList.appendChild(taskDiv);
  });
}

// Видаляє список
export async function deleteCheck(event) {
  const item = event.target;
  const deleteButton = item.closest(".delete-btn");

  if (deleteButton) {
    const listName = deleteButton.parentElement.textContent.trim();
    await deleteTaskList(listName); // Видаляємо через API
    updateTaskLists(); // Оновлюємо відображення списків
  }
}

// Обробник кліку на список
export function handleListClick(event) {
  const clickedList = event.target.closest(".list-name");
  if (clickedList) {
    activeList = clickedList.textContent.trim();

    if (!taskLists[activeList]) {
      taskLists[activeList] = [];
    }

    updateTodoList(activeList);
  }
}
