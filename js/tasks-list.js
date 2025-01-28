const taskList = document.querySelector(".task-list"); // Список <ul>
const inputField = document.querySelector(".new.list"); // Поле для введення нового списку
const buttonCreateTasks = document.querySelector(".all-tasks .btn.create"); // Кнопка додавання нового списку
export let activeList = null;
export const taskLists = {};
buttonCreateTasks.addEventListener("click", addTasks);
taskList.addEventListener("click", deleteCheck);
taskList.addEventListener("click", handleListClick);
// Додає новий список
export function addTasks(event) {
  event.preventDefault(); // Запобігаємо перезавантаженню сторінки
  const inputValue = inputField.value.trim();

  if (inputValue === "") {
    alert("Please enter a list name!");
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

  taskLists[inputValue] = []; // Додаємо новий список у об'єкт
}

// Видаляє список
export function deleteCheck(event) {
  const item = event.target;
  const deleteButton = item.closest(".delete-btn");
  if (deleteButton) {
    const todo = deleteButton.parentElement;
    todo.remove();
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