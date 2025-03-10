import { updateTodoList } from "./todo-list.js";
import { showAlert } from "./alert.js";
const taskList = document.querySelector(".task-list"); // Список <ul>
const inputField = document.querySelector(".new.list"); // Поле для введення нового списку
const buttonCreateTasks = document.querySelector(".all-tasks .btn.create"); // Кнопка додавання нового списку
const todoTasks = document.querySelector(".tasks"); 
const todoTitle = document.querySelector(".list-title");
export let activeList = null;
export const taskLists = JSON.parse(localStorage.getItem("taskListData")) || {};
buttonCreateTasks.addEventListener("click", addTasks);
taskList.addEventListener("click", deleteCheck);
taskList.addEventListener("click", handleListClick);
// Додає новий список
export function addTasks(event) {
  event.preventDefault(); // Запобігаємо перезавантаженню сторінки
  const inputValue = inputField.value.trim();

  if (inputValue === "") {
    showAlert("Please enter a list name!");
    return;
  }

  const taskDiv = document.createElement("div");
  taskDiv.classList.add("list-container");
  taskList.appendChild(taskDiv);

  const newTask = document.createElement("li");
  newTask.innerText = inputValue;
  newTask.classList.add("list-name");
  taskDiv.appendChild(newTask);

  inputField.value = "";

  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="bi bi-check2-square"></i>';
  completedButton.classList.add("complete-btn");
  taskDiv.appendChild(completedButton);

  const deletedButton = document.createElement("button");
  deletedButton.innerHTML = '<i class="bi bi-trash3"></i>';
  deletedButton.classList.add("delete-btn");
  taskDiv.appendChild(deletedButton);

  taskLists[inputValue] = [{completed: false}]; // Додаємо новий список у об'єкт
  localStorage.setItem("taskListData", JSON.stringify(taskLists));
}

export function loadTaskList() {
  taskList.innerHTML = "";

  for(const listName in taskLists) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("list-container");
    taskList.appendChild(taskDiv);
  
    const newTask = document.createElement("li");
    newTask.innerText = listName;
    newTask.classList.add("list-name");
    taskDiv.appendChild(newTask);
  
    inputField.value = "";
  
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="bi bi-check2-square"></i>';
    completedButton.classList.add("complete-btn");
    taskDiv.appendChild(completedButton);
  
    const deletedButton = document.createElement("button");
    deletedButton.innerHTML = '<i class="bi bi-trash3"></i>';
    deletedButton.classList.add("delete-btn");
    taskDiv.appendChild(deletedButton);

    if(taskLists[listName][0].completed) {
      taskDiv.classList.add("completed");
    }
  }
}

// Видаляє список
export function deleteCheck(event) {
  const item = event.target;
  const deleteButton = item.closest(".delete-btn");
  if (deleteButton) {
    const todo = deleteButton.parentElement;
    const itemID = todo.querySelector(".list-name").innerText.trim();

    // Переконуємося, що Task List існує перед видаленням
    if (taskLists[itemID]) {
      delete taskLists[itemID]; // Видаляємо список із taskLists
      localStorage.setItem("taskListData", JSON.stringify(taskLists)); // Оновлюємо localStorage
    }

    // Якщо це активний список, очищаємо завдання у todoTasks
    if (activeList === itemID) {
      activeList = null;
      todoTasks.innerHTML = ""; // Очищуємо відображення завдань
      todoTitle.textContent = "Select a list"; // Міняємо заголовок
      updateTaskCount();
    }

    // Видаляємо сам Task List із DOM
    todo.remove();
  }

  const checkButton = item.closest(".complete-btn");
  if (checkButton) {
    const todo = checkButton.parentElement;
    const itemID = todo.querySelector(".list-name").innerText.trim();

    todo.classList.toggle("completed"); // Додаємо/знімаємо клас "completed"

    if (taskLists[itemID]) {
      taskLists[itemID][0].completed = todo.classList.contains("completed"); // Оновлюємо статус виконання
      localStorage.setItem("taskListData", JSON.stringify(taskLists)); // Зберігаємо оновлені дані
    }
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

document.addEventListener("DOMContentLoaded", loadTaskList);

document.addEventListener("DOMContentLoaded", () => {
  // const completeBtn = document.querySelector(".complete-btn");
  document.body.addEventListener("click", (event) => {
    if(event.target.closest(".complete-btn")){
      loadTaskList();
    }
    if (event.target.closest(".delete-btn")) {
      loadTaskList();
      console.log(
        Object.keys(localStorage.getItem("taskListData")).length
      );
      if (Object.keys(localStorage.getItem("taskListData")).length === 2) {
        window.location.reload();
      }
    }
  })
  loadTaskList();

});