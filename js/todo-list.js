import { activeList, taskLists } from "./tasks-list.js";
import { showAlert } from "./alert.js";

const todoTasks = document.querySelector(".tasks");
const todoTitle = document.querySelector(".list-title");
const inputTodo = document.querySelector(".new.task");
const buttonCreateTodo = document.querySelector(".todo-body .btn.create");
loadFromLocalStorage();
// Оновлює відображення завдань
export function updateTodoList(listName) {
  todoTasks.innerHTML = "";
  todoTitle.textContent = listName;

  if (taskLists[listName][0].completed) {
    taskLists[listName].forEach(() => {
      if(index === 0) return;
      taskLists.isCompleted = true;
    })
  }

  if (taskLists[listName] && Array.isArray(taskLists[listName])) {
    taskLists[listName].forEach((task, index) => {
      if (index === 0) return;
      const taskElement = document.createElement("li");
      taskElement.classList.add("task-item");

      const taskText = document.createElement("span");
      taskText.textContent = task.text;
      taskElement.appendChild(taskText);

      const completedSecondButton = document.createElement("button");
      completedSecondButton.innerHTML = '<i class="bi bi-check2-square"></i>';
      completedSecondButton.classList.add("complete-btn");
      completedSecondButton.addEventListener("click", () => {
        taskElement.classList.toggle("completed");
        const activeTaskListId = document
          .querySelector(".list-title")
          .innerText.trim();
        const itemId = task.text.trim();

        taskLists[activeTaskListId].forEach((taskFromTaskLists) => {
          if (taskFromTaskLists.text === itemId) {
            taskFromTaskLists.isCompleted = !taskFromTaskLists.isCompleted;
          }
        });
        localStorage.setItem("taskListData", JSON.stringify(taskLists));
      });

      const deletedSecondButton = document.createElement("button");
      deletedSecondButton.innerHTML = '<i class="bi bi-trash3"></i>';
      deletedSecondButton.classList.add("delete-btn");
      deletedSecondButton.addEventListener("click", () => {
        taskLists[listName].splice(index, 1);
        localStorage.setItem("taskListData", JSON.stringify(taskLists));
        updateTodoList(listName);
        updateTaskCount();
      });

      taskElement.appendChild(completedSecondButton);
      taskElement.appendChild(deletedSecondButton);
      todoTasks.appendChild(taskElement);

      [...todoTasks.children].forEach((task) => {
        const taskListId = document
          .querySelector(".list-title")
          .textContent.trim();
        const searchedTask = taskLists[taskListId].find(
          (taskFromList) => taskFromList.text === task.innerText
        );
        if (searchedTask.isCompleted) {
          task.classList.add("completed");
        }
      });

      localStorage.setItem("taskListData", JSON.stringify(taskLists));
    });
  }
  updateTaskCount();
}

// Оновлює кількість завдань
export function updateTaskCount() {
  if (!activeList || !taskLists[activeList]) return;

  const taskCount = taskLists[activeList].length - 1;
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
    showAlert("Please select a list first!", "#f44336");
    return;
  }

  if (taskValue === "") {
    showAlert("Please enter a task name!", "#f44336");
    return;
  }

  if (!taskLists[activeList]) {
    taskLists[activeList] = [];
  }

  taskLists[activeList].push({ text: `${taskValue}`, isCompleted: false });
  localStorage.setItem("taskListData", JSON.stringify(taskLists));
  inputTodo.value = "";

  updateTodoList(activeList);
});

function loadFromLocalStorage() {
  try {
    const storedData = localStorage.getItem("taskListData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      Object.assign(taskLists, parsedData); // Оновлюємо об'єкт, а не переприсвоюємо змінну
    }
  } catch (error) {
    console.error("Error loading data from localStorage:", error);
  }
}
