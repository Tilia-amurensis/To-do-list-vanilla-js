import { activeList, taskLists } from "./tasks-list.js";

const todoTasks = document.querySelector(".tasks");
const todoTitle = document.querySelector(".list-title");
const inputTodo = document.querySelector(".new.task");
const buttonCreateTodo = document.querySelector(".todo-body .btn.create");

// Оновлює відображення завдань
export function updateTodoList(listName) {
  todoTasks.innerHTML = "";
  todoTitle.textContent = listName;

  if (taskLists[listName] && Array.isArray(taskLists[listName])) {
    taskLists[listName].forEach((task, index) => {
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
      deletedSecondButton.addEventListener("click", () => {
        taskLists[listName].splice(index, 1);
        updateTodoList(listName);
        updateTaskCount();
      });

      taskElement.appendChild(completedSecondButton);
      taskElement.appendChild(deletedSecondButton);
      todoTasks.appendChild(taskElement);
    });
  }
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
buttonCreateTodo.addEventListener("click", function (event) {
  event.preventDefault();

  const taskValue = inputTodo.value.trim();
  if (!activeList) {
    alert("Please select a list first!");
    return;
  }

  if (taskValue === "") {
    alert("Please enter a task name!");
    return;
  }

  if (!taskLists[activeList]) {
    taskLists[activeList] = [];
  }

  taskLists[activeList].push(taskValue);
  inputTodo.value = "";

  updateTodoList(activeList);
});