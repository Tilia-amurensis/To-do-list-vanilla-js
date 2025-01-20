//selectors

const taskList = document.querySelector(".task-list"); // Список <ul>
const inputField = document.querySelector(".new.list"); // Поле для введення нового списку
const buttonCreateTasks = document.querySelector(".all-tasks .btn.create"); // Кнопка додавання

buttonCreateTasks.addEventListener("click", addTasks);


function addTasks(event) {
  event.preventDefault(); // Запобігаємо перезавантаженню сторінки
  
  const inputValue = inputField.value.trim(); // Отримуємо значення з інпуту та видаляємо пробіли
  if (inputValue === "") {
    alert("Please enter a list name!"); // Якщо поле порожнє, показуємо попередження
    return;
  }

  // Створюємо новий <li> елемент
  const newTask = document.createElement("li");
  newTask.innerText = inputValue; // Додаємо текст із інпуту
  newTask.classList.add("list-name"); // Додаємо клас для нового елемента

  // Додаємо новий <li> до списку <ul>
  taskList.appendChild(newTask);

  // Очищаємо поле введення
  inputField.value = "";
}