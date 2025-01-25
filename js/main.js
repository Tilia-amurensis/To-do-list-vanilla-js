//selectors

const taskList = document.querySelector(".task-list"); // Список <ul>
const inputField = document.querySelector(".new.list"); // Поле для введення нового списку
const buttonCreateTasks = document.querySelector(".all-tasks .btn.create"); // Кнопка додавання нового списку
const todoTasks = document.querySelector(".tasks");// Список ul
const todoTitle = document.querySelector(".list-title");// Заголовок todo list
const inputTodo = document.querySelector(".new.task"); //Поле для введення нового завдання
const buttonCreateTodo = document.querySelector(".todo-body .btn.create");// Кнопка додавання нового завдання
let activeList = null;
const taskLists = {};


buttonCreateTasks.addEventListener("click", addTasks);
taskList.addEventListener("click", deleteCheck);
listItem.addEventListener("click", handleListClick);

function addTasks(event) {
  event.preventDefault(); // Запобігаємо перезавантаженню сторінки

  const inputValue = inputField.value.trim(); // Отримуємо значення з інпуту та видаляємо пробіли
  if (inputValue === "") {
    alert("Please enter a list name!"); // Якщо поле порожнє, показуємо попередження
    return;
  }

  const taskDiv = document.createElement("div");
  taskDiv.classList.add("list-container");
  taskList.appendChild(taskDiv);

  // Створюємо новий <li> елемент
  const newTask = document.createElement("li");
  newTask.innerText = inputValue; // Додаємо текст із інпуту
  newTask.classList.add("list-name"); // Додаємо клас для нового елемента

  // Додаємо новий <li> до списку <ul>
  taskDiv.appendChild(newTask);

  // Очищаємо поле введення
  inputField.value = "";

  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="bi bi-check2-square"></i>';
  completedButton.classList.add("complete-btn");
  taskDiv.appendChild(completedButton);

  const deletedButton = document.createElement("button");
  deletedButton.innerHTML = '<i class="bi bi-trash3"></i>';
  deletedButton.classList.add("delete-btn");
  taskDiv.appendChild(deletedButton);
}

function deleteCheck(event) {
  const item = event.target;
  // Перевіряємо, чи натиснуто кнопку "delete-btn" або її іконку
  const deleteButton = item.closest(".delete-btn");
  if (deleteButton) {
    const todo = deleteButton.parentElement; // Батьківський контейнер для видалення
    todo.remove(); // Видаляємо батьківський елемент
  }

  const checkButton = item.closest(".complete-btn");
  if(checkButton) {
    const todo = checkButton.parentElement;
    todo.classList.toggle("completed");
  }
}

function updateToDoList(listName) {
  todoTasks.innerHTML = "";
  todoTitle.textContent = listName;

  if(taskLists[listName]) {
    taskLists[listName].forEach((task) => {
const taskElement = document.createElement("li");
taskElement.textContent = task;
todoTasks.appendChild(taskElement);
    })
  }
}

function handleListClick(event) {
  const clickedList = event.target.closest(".list-name");
  if(clickedList) {
    activeList = clickedList.textContent;
  }

  if(!taskList[activeList]) {
    taskLists[activeList] = [];
  }

  updateToDoList(activeList);
}

taskList.addEventListener("click", handleListClick);

buttonCreateTodo.addEventListener("click" , function(event) {
  event.preventDefault();

  const taskValue = inputTodo.value.trim();
  if(!activeList) {
    alert("please select a list first!");
    return;
  }

  if(taskValue === "") {
    alert("please enter a task name!");
    return;
  }

  taskList[activeList].push(taskValue);
  inputTodo.value = "";
  updateToDoList(activeList);
});
