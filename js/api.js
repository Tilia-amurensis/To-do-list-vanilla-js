//in development

const API_URL = "http://localhost:5000/lists";

export async function getTaskLists() {
    const response = await fetch(API_URL);
    return response.json();
}

/*export async function createTaskList(listName) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ listName }),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return null;
    }
}*/
export async function createTaskList(name) {
    const response = await fetch("http://localhost:5000/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    });
  
    const data = await response.json();
    console.log("Доданий список:", data); // Перевіряємо, що приходить у відповідь
    return data;
  }
export async function getTasks(listName) {
    const response =  await fetch(`http://localhost:5000/todos?list=${encodeURIComponent(listName)}`);
    return response.json();
}

export async function addTask(listName, task) {
    const response =  await fetch(`${API_URL}/${encodeURIComponent(listName)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({task}),
});
    return response.json();
}

export async function deleteTaskList(listName) {
    const response = await fetch(`${API_URL}/${encodeURIComponent(listName)}`, {
        method: "DELETE",
    });
    return response.json();
}

export async function deleteTask(listName, taskIndex) {
    const response = await fetch(`${API_URL}/${encodeURIComponent(listName)}/${taskIndex}`, {
        method: "DELETE",
    });
    return response.json();
}

