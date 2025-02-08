//in development

const http = require('http');
const fs = require('fs');

const PORT = 5000;
const FILE_NAME = "todos.json";
const LISTS_FILE = "lists.json";

function readLists() {
    if (!fs.existsSync(LISTS_FILE)) return [];
    return JSON.parse(fs.readFileSync(LISTS_FILE, "utf-8"));
}

function saveLists(lists) {
    fs.writeFileSync(LISTS_FILE, JSON.stringify(lists, null, 2));
}

function readTodos() {
    if (!fs.existsSync(FILE_NAME)) return [];
    return JSON.parse(fs.readFileSync(FILE_NAME, "utf-8"));
}

function saveTodos(todos) { 
    fs.writeFileSync(FILE_NAME, JSON.stringify(todos, null, 2)); 
}

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") { 
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === "GET" && req.url === "/lists") {
        const lists = readLists().map(todo => todo.name);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(lists));
    }

    else if (req.method === "POST" && req.url === "/lists") {
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", () => {
            const lists = readLists();
            const newList = JSON.parse(body).listName;
            lists.push({ name: newList, tasks: [] });
            saveLists(lists);
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true, listName: newList }));
        });
    }

    else if (req.method === "GET" && req.url.startsWith("/todos")) {
        const listName = new URL(`http://localhost:5000${req.url}`).searchParams.get("list");
        const todos = readTodos().find(l => l.name === listName)?.tasks || [];
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(todos));
    }

    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});