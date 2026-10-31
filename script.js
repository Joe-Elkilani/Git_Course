const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const counter = document.getElementById("counter");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function render() {
  list.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item" + (todo.done ? " done" : "");

    const text = document.createElement("span");
    text.textContent = todo.text;
    text.addEventListener("click", () => toggleTodo(todo.id));

    const del = document.createElement("button");
    del.className = "delete-btn";
    del.textContent = "✕";
    del.addEventListener("click", () => deleteTodo(todo.id));

    li.append(text, del);
    list.appendChild(li);
  });

  const remaining = todos.filter((t) => !t.done).length;
  counter.textContent = todos.length
    ? `المتبقي: ${remaining} من ${todos.length}`
    : "مفيش مهام لسه";
}

function addTodo(text) {
  todos.push({ id: Date.now(), text, done: false });
  save();
  render();
}

function toggleTodo(id) {
  todos = todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  save();
  render();
}

function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  save();
  render();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addTodo(text);
  input.value = "";
});

render();
