// Variables
var orgName = document.getElementById("org-name");
var logo = document.getElementById("logo");
var difficultyDropdownContainer = document.getElementById("difficulty-dropdown");
var difficultyDropdownIcon = document.getElementById("difficulty-dropdown-icon");
var difficultyDropdownContent = document.getElementById("difficulty-dropdown-content");
var difficultyDropdownInitiator = document.getElementById("difficulty-dropdown-initiator");
var difficultyDropdownTitle = document.getElementById("difficulty-dropdown-title");
var articleTemplate = document.getElementById("article-template");
var articleContainer = document.getElementById("article-container");
var searchBar = document.getElementById("search-bar");

var mouseIn = false;
var difficultyDropdown = false;

const url = new URL(window.location.href);
const args = url.searchParams;

// Functions
function reloadWithParams() {

  var url = "https://cybersecuritymgci.ml/explore"
  var idx = 0;

  args.forEach((key, value) => {
    if (value) {
      if (idx == 0) {
        url += "?";
      } else {
        url += "&";
      }

      url += value + "=" + key;
      idx++;
    }
  })

  window.location.href = url;
}

function noDifficulty() {
  args.delete("difficulty");
  reloadWithParams();
}

function basicDifficulty() {
  args.set("difficulty", "basic");
  reloadWithParams();
}

function intermediateDifficulty() {
  args.set("difficulty", "intermediate");
  reloadWithParams();
}

function advancedDifficulty() {
  args.set("difficulty", "advanced");
  reloadWithParams();
}

function spawnArticle(data, idx) {

  var copy = articleTemplate.cloneNode(true);
  copy.id = "";
  copy.classList.toggle("no-display");
  articleContainer.appendChild(copy);

  var title = copy.querySelector(".article-title");
  title.innerHTML = data.articles[idx].title;

  var description = copy.querySelector(".article-description");
  description.innerHTML = data.articles[idx].description;

  var thumbnail = copy.querySelector(".article-thumbnail");
  thumbnail.style.backgroundImage = `url("../assets/images/articles/thumbnails/${data.articles[idx].id}.png")`;

  var tagContainer = copy.querySelector(".tag-container");

  for (var tag in data.articles[idx].tags) {

    if (typeof data.articles[idx].tags[tag] == "string") {
      var indicator = document.createElement("p");

      indicator.classList.add(`${tag}-${data.articles[idx].tags[tag].toLowerCase()}`);
      indicator.classList.add("tag");
      indicator.innerHTML = data.articles[idx].tags[tag];

      tagContainer.appendChild(indicator);
    } else {
      for (var subtag in data.articles[idx].tags[tag]) {
        var indicator = document.createElement("p");

        indicator.classList.add(`${tag}-${data.articles[idx].tags[tag][subtag].toLowerCase().replaceAll(" ", "-")}`);
        indicator.classList.add("tag");
        indicator.innerHTML = data.articles[idx].tags[tag][subtag];

        tagContainer.appendChild(indicator);
      }
    }
  }

  setTimeout(function() {
    copy.classList.toggle("transparent");
    copy.addEventListener("click", () => {
      window.location.href = `/articles/${data.articles[idx].id}`;
    })
  }, idx * 150);
}

function toggleDifficultyDropdown() {

  difficultyDropdown = !difficultyDropdown;
  difficultyDropdownContent.classList.toggle("dropdown-show");

  if (difficultyDropdown) {
    difficultyDropdownIcon.style.transform = "rotate(0deg)";
    difficultyDropdownContainer.style.zIndex = "10";
  } else {
    difficultyDropdownIcon.style.transform = "rotate(180deg)";

    setTimeout(function() {
      if (!difficultyDropdown) {
        difficultyDropdownContainer.style.zIndex = "0";
      }
    }, 500);
  }
}

async function loadArticles() {

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

function search(ele) {
  if (event.key === 'Enter') {
    if (ele.value) {
      args.set("keywords", ele.value);
    } else {
      args.delete("keywords");
    }

    reloadWithParams();
  }
}

// Main
if (args.get("difficulty")) {
  difficultyDropdownTitle.innerHTML = args.get("difficulty").charAt(0).toUpperCase() + args.get("difficulty").slice(1);
}

if (args.get("keywords")) {
  searchBar.value = args.get("keywords");
}

loadArticles().then((data) => {
  if (!data.error) {
    for (var idx in data.articles) {
      spawnArticle(data, idx);
    }
  } else {
    console.log(data.error);
  }
})