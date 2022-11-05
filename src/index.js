import './style.css';

(async function() {
  const url = 'http://localhost:3000/';

  const main = document.querySelector("main");

  const [users, todos] = await Promise.all([
    fetch(url + 'users').then(response => response.json()),
    fetch(url + 'todos').then(response => response.json())
  ]);

  const info = {};

  users.forEach(user => {
    const el = document.createElement("article");
    el.innerHTML = "<div class='name'></div><ul class='todos'></ul>";
    el.querySelector(".name").textContent = user.name;
    main.insertAdjacentElement("beforeend", el);

    user.element = el;

    info[user.id] = user;
  });

  todos.forEach(todo => {
    if (!(todo.userId in info)) return;

    const el = info[todo.userId].element;
    const li = document.createElement("li");
    li.className = todo.completed ? "completed" : "not-completed";
    li.textContent = todo.title;

    el.querySelector(".todos").insertAdjacentElement("beforeend", li);
  });
})();
