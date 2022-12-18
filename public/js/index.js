// Variables
var laptopTop = document.getElementById("laptop-top");
var laptopBottom = document.getElementById("laptop-bottom");
var laptopSelector = document.getElementById("laptop-selector");
var laptopScreen = document.getElementById("laptop-screen");
var laptopContainer = document.getElementById("laptop-container");
var titleContainer = document.getElementById("title-container");

var mouseIn = false;

// Functions
function mouseMove(event) {

  const width = window.innerWidth;
  const height = window.innerHeight;

  if (event.clientX > width * 0.1 && event.clientX < width * 0.4 && event.clientY > height * 0.4 && event.clientY < height * 0.7) {
    animationStart();
  } else {
    animationEnd();
  }
}

// Main
function animationStart() {

  mouseIn = true;

  laptopBottom.classList.add("laptop-bottom-open");
  laptopTop.classList.add("laptop-top-open");
  laptopBottom.classList.remove("laptop-bottom-closed");
  laptopTop.classList.remove("laptop-top-closed");
  laptopContainer.style.bottom = "17%";
  laptopContainer.style.right = "22%";

  setTimeout(function() {

    if (mouseIn) {
      laptopScreen.style.background = "white";
      laptopScreen.style.filter = "blur(3px)";
    }
  }, 1000);
};

function animationEnd() {

  mouseIn = false;

  laptopBottom.classList.remove("laptop-bottom-open");
  laptopTop.classList.remove("laptop-top-open");
  laptopBottom.classList.add("laptop-bottom-closed");
  laptopTop.classList.add("laptop-top-closed");
  laptopScreen.style.background = "#171717";
  laptopScreen.style.filter = "blur(0px)";
  laptopContainer.style.bottom = "15%";
  laptopContainer.style.right = "19%";
};