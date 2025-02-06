const API_URL = "http://localhost:5000/lists";

export async function getTaskLists() {
    const response = await fetch(API_URL);
    return response.json();
}

export async function createTaskList(listName) {
    const response =  await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({listName}),
    });
    return response.json();
}

export async function getTasks(listName) {
    const response =  await fetch(`${API_URL}/${encodeURIComponent(listName)}`);
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