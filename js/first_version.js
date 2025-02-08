const taskList = document.querySelector(".task-list"); // Список <ul>
const inputField = document.querySelector(".new.list"); // Поле для введення нового списку
const buttonCreateTasks = document.querySelector(".all-tasks .btn.create"); // Кнопка додавання нового списку
const todoTasks = document.querySelector(".tasks"); // Список ul
const todoTitle = document.querySelector(".list-title"); // Заголовок todo list
const inputTodo = document.querySelector(".new.task"); //Поле для введення нового завдання
const buttonCreateTodo = document.querySelector(".todo-body .btn.create"); // Кнопка додавання нового завданн
let activeList = null;
const taskLists = {};

buttonCreateTasks.addEventListener("click", addTasks);
taskList.addEventListener("click", deleteCheck);
taskList.addEventListener("click", handleListClick);

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
  if (checkButton) {
    const todo = checkButton.parentElement;
    todo.classList.toggle("completed");
  }
}

function updateTodoList(listName) {
  todoTasks.innerHTML = ""; // Очищаємо завдання
  todoTitle.textContent = listName; // Оновлюємо заголовок списку

  const taskCount = taskLists[listName]?.length || 0;
  

  // Перевірка існування списку перед додаванням завдань
  if (taskLists[listName] && Array.isArray(taskLists[listName])) {
    taskLists[listName].forEach((task, index) => {
      const taskElement = document.createElement("li");
      taskElement.classList.add("task-item");

      // Додаємо текст завдання
      const taskText = document.createElement("span");
      taskText.textContent = task;
      taskElement.appendChild(taskText);

      // Додаємо кнопку "Completed"
      const completedSecondButton = document.createElement("button");
      completedSecondButton.innerHTML = '<i class="bi bi-check2-square"></i>';
      completedSecondButton.classList.add("complete-btn");
      completedSecondButton.addEventListener("click", () => {
        taskElement.classList.toggle("completed"); // Позначаємо/знімаємо як виконане
      });

      // Додаємо кнопку "Delete"
      const deletedSecondButton = document.createElement("button");
      deletedSecondButton.innerHTML = '<i class="bi bi-trash3"></i>';
      deletedSecondButton.classList.add("delete-btn");
      deletedSecondButton.addEventListener("click", () => {
        taskLists[listName].splice(index, 1); // Видаляємо завдання з масиву
        updateTodoList(listName); // Оновлюємо відображення
      });

      // Додаємо кнопки до елемента завдання
      taskElement.appendChild(completedSecondButton);
      taskElement.appendChild(deletedSecondButton);

      // Додаємо елемент завдання до списку
      todoTasks.appendChild(taskElement);
    });
  }
  updateTaskCount();
}

function updateTaskCount() {
  if (!activeList || !taskLists[activeList]) return;

  const taskCount = taskLists[activeList].length;
  const taskCountElement = document.querySelector(".task-count"); // Знайди елемент task count

  if (taskCountElement) {
    taskCountElement.textContent = `${taskCount} tasks remaining`;
  }
}

function handleListClick(event) {
  const clickedList = event.target.closest(".list-name");
  if (clickedList) {
    activeList = clickedList.textContent;
  }

  if (!taskList[activeList]) {
    taskLists[activeList] = [];
  }

  updateTodoList(activeList);
}

taskList.addEventListener("click", handleListClick);

buttonCreateTodo.addEventListener("click", function (event) {
  event.preventDefault();

  const taskValue = inputTodo.value.trim(); // Отримуємо текст завдання
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
  updateTaskCount();
});