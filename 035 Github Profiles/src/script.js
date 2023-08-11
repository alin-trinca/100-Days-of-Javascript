const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

function getUserUrl(username) {
  return `${APIURL}${username}`;
}

function getUserReposUrl(username) {
  return `${APIURL}${username}/repos?sort=created`;
}

async function getUser(username) {
  try {
    const { data } = await axios(getUserUrl(username));
    createUserCard(data);
    getRepos(username);
  } catch (err) {
    if (err.response.status == 404) {
      createErrorCard("No profile with this username");
    }
  }
}

async function getRepos(username) {
  try {
    const { data } = await axios(getUserReposUrl(username));
    addReposToCard(data);
  } catch (err) {
    createErrorCard("Problem fetching repos");
  }
}

function createUserCard(user) {
  main.innerHTML = getUserCardHtml(user);
}

function getUserCardHtml(user) {
  return `
    <div class="user">
      <div>
        <img src="${user.avatar_url}" alt="${user.name}" class="user__avatar">
      </div>
      <div class="user__info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>
        <ul>
          <li>${user.followers} <strong>Followers</strong></li>
          <li>${user.following} <strong>Following</strong></li>
          <li>${user.public_repos} <strong>Repos</strong></li>
        </ul>
        <div id="repos"></div>
      </div>
    </div>`;
}

function createErrorCard(msg) {
  main.innerHTML = getErrorCardHtml(msg);
}

function getErrorCardHtml(msg) {
  return `
    <div class="card">
        <h2>${msg}</h2>
    </div>`;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");

  repos.slice(0, 5).forEach((repo) => {
    const repoEl = document.createElement("a");
    repoEl.classList.add("repo");
    repoEl.href = repo.html_url;
    repoEl.target = "_blank";
    repoEl.innerText = repo.name;

    reposEl.appendChild(repoEl);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);
    search.value = "";
  }
});
