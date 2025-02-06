const http = require('http');
const fs = require('fs');

const PORT = 5000;
const FILE_NAME = "todos.json";
const LISTS_FILE = "lists.json";

function readLists() {
    if(!fs.existsSync(LISTS_FILE)) return [];
    return JSON.parse(fs.readFileSync(LISTS_FILE, "utf-8"));
}

function saveLists(lists) {
   fs.writeFileSync(LISTS_FILE, JSON.stringify(lists, null, 2));
}

function readTodos () {
    if(!fs.existsSync(FILE_NAME)) return [];
    return JSON.parse(fs.readFileSync(FILE_NAME, "utf-8"));
}

function saveTodos() {
    fs.writeFileSync(FILE_NAME, JSON.stringify(readTodos, null, 2));
}

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if(req.method === "OPTIONs") {
        res.writeHead(204);
        res.end();
        return;
    }

     else if(req.method === "POST" && req.url === "/todos") {
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", () => {
            const todos = readTodos();
            const newTodo = {id: Date.now(), text: JSON.parse(body).text, completed: false};
            todos.push(newTodo);
            saveTodos(todos);
            res.writeHead(201, {"Content-Type": "application/json"});
            res.end(JSON.stringify(newTodo));
        })
    }
    else if(req.method === "DELETE" && req.url.startsWith("/todos/")) {
        const id = parseInt(req.url.split("/")[2]);
        let todos = readTodos();
        todos = todos.filter(todo =>  todo.id !== id);
        res.writeHead(200, {"Content-Type": "application/json" });
        res.end(JSON.stringify({message: "Task deleted"}))
    }
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
    }
})

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})