function renderLists() {
    taskList.innerHTML = ""; // Очищуємо DOM
  
    for (const newTask in lists) {
      const listItem = document.createElement("li");
      listItem.innerHTML = newTask;
      listItem.classList.add("list-name");
  
      // Додаємо обробник подій
      listItem.addEventListener("click", handleListClick);
  
      // Додаємо кнопки
      const completedButton = document.createElement("button");
      completedButton.innerHTML = '<i class="bi bi-check2-square"></i>';
      completedButton.classList.add("complete-btn");
      listItem.appendChild(completedButton);
  
      const deletedButton = document.createElement("button");
      deletedButton.innerHTML = '<i class="bi bi-trash3"></i>';
      deletedButton.classList.add("delete-btn");
      listItem.appendChild(deletedButton);
  
      if (newTask === activeList) {
        listItem.classList.add("active");
      }
  
      taskList.appendChild(listItem);
    }
  }
  
  function handleListClick (event) {
    const clickedItem = event.target.closest(".list-name");
  
    if(clickedItem) {
      activeList = clickedItem.innerHTML;
      renderActiveList();
    }
  }
  
  function renderActiveList() {
    todoTasks.innerHTML = "";
    todoTitle.innerText = activeList || "Select List";
  
    lists[activeList].forEach((task, index) => {
      const taskItem = document.createElement("li");
      taskItem.innerText = task;
      taskItem.classList.add("task-item");
      todoTasks.appendChild(taskItem); // Додаємо кожен елемент.
    });
    }
  
  
  renderLists();