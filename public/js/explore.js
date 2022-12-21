// Variables
var orgName = document.getElementById("org-name");
var logo = document.getElementById("logo");
var difficultyDropdownIcon = document.getElementById("difficulty-dropdown-icon");
var difficultyDropdownContent = document.getElementById("difficulty-dropdown-content");
var difficultyDropdownInitiator = document.getElementById("difficulty-dropdown-initiator");
var difficultyDropdownTitle = document.getElementById("difficulty-dropdown-title");

var mouseIn = false;
var difficultyDropdown = false;

const url = new URL(window.location.href);
const args = url.searchParams;

// Functions
function toggleDifficultyDropdown() {

  difficultyDropdown = !difficultyDropdown;
  difficultyDropdownContent.classList.toggle("dropdown-show");

  if (difficultyDropdown) {
    difficultyDropdownIcon.style.transform = "rotate(0deg)";
  } else {
    difficultyDropdownIcon.style.transform = "rotate(180deg)";
  }
}

async function loadArticles() {

  console.log(JSON.stringify());

  let res = await fetch(window.location.href, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  if (res.ok) {
    return await res.json();
  } else {
    return { "error": `HTTP Error: ${res.status}` };
  }
}

// Main
if (args.get("difficulty")) {
  difficultyDropdownTitle.innerHTML = args.get("difficulty").charAt(0).toUpperCase() + args.get("difficulty").slice(1);
}

loadArticles().then((data) => {
  if (!data.error) {
    console.log(data)
    for (var idx in data.articles) {
      console.log(data.articles[idx]);
    }
  } else {
    console.log(data.error);
  }
})