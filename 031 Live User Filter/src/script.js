const result = document.getElementById("result");
const filter = document.getElementById("filter");
const listItems = [];

filter.addEventListener("input", (e) => filterData(e.target.value));

async function fetchUsers() {
  const res = await fetch("https://randomuser.me/api?results=30");
  return await res.json();
}

function createUserItemTemplate(user) {
  return `
    <img src="${user.picture.large}" alt="${user.name.first}">
    <div class="user-info">
        <h4>${user.name.first} ${user.name.last}</h4>
        <p>${user.location.city}, ${user.location.country}</p>
    </div>
  `;
}

function renderUsers(users) {
  result.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerHTML = createUserItemTemplate(user);
    listItems.push(li);
    result.appendChild(li);
  });
}

async function getData() {
  const { results } = await fetchUsers();
  renderUsers(results);
}

function filterData(searchTerm) {
  listItems.forEach((item) => {
    item.classList[
      item.innerText.toLowerCase().includes(searchTerm.toLowerCase())
        ? "remove"
        : "add"
    ]("hide");
  });
}

getData();
