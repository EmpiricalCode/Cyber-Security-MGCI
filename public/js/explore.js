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

// Main
if (args.get("difficulty")) {
  difficultyDropdownTitle.innerHTML = args.get("difficulty").charAt(0).toUpperCase() + args.get("difficulty").slice(1);
}