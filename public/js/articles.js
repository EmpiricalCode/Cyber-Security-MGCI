// Variables
var articleBody = document.getElementById("article-body");
var title = document.getElementById("title");
var tagContainer = document.getElementById("tag-container");
var questionContainer = document.getElementById("question-container");
var questionTemplate = document.querySelector(".question");

// Functions
async function loadContent() {

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

loadContent().then((data) => {

  document.title = data.title;

  title.innerHTML = data.title;
  title.id = "title";

  for (var tag in data.tags) {

    if (typeof data.tags[tag] == "string") {
      var indicator = document.createElement("p");

      indicator.classList.add(`${tag}-${data.tags[tag].toLowerCase()}`);
      indicator.classList.add("tag");
      indicator.innerHTML = data.tags[tag];

      tagContainer.appendChild(indicator);
    } else {
      for (var subtag in data.tags[tag]) {
        var indicator = document.createElement("p");

        indicator.classList.add(`${tag}-${data.tags[tag][subtag].toLowerCase().replaceAll(" ", "-")}`);
        indicator.classList.add("tag");
        indicator.innerHTML = data.tags[tag][subtag];

        tagContainer.appendChild(indicator);
      }
    }
  }

  data.content.forEach((segment) => {

    var element = document.createElement(segment.type);
    element.classList.add(segment.type);

    if (segment.type == "img") {
      element.src = segment.src;
      element.width = segment.width;
    } else {
      element.innerHTML = segment.content;
    }

    articleBody.appendChild(element);
  })

  data.quiz.forEach((question) => {
    var questionElement = questionTemplate.cloneNode(true);
    var choiceTemplate = questionElement.querySelector(".question-choice");

    questionContainer.appendChild(questionElement);
    questionElement.querySelector(".question-title").innerHTML = question.title;
    questionElement.classList.remove("no-display");

    question.choices.forEach((choice) => {

      var choiceElement = choiceTemplate.cloneNode();
      questionElement.appendChild(choiceElement);
      choiceElement.innerHTML = choice.content;
      choiceElement.classList.remove("no-display");

      choiceElement.onclick = () => {

        Array.from(choiceElement.parentNode.children).forEach((child) => {
          if (child != choiceElement) {

            child.classList.remove("question-choice-correct");
            child.classList.remove("question-choice-incorrect");
          } else {
            if (choice.correct) {
              choiceElement.classList.add("question-choice-correct");
            } else {
              choiceElement.classList.add("question-choice-incorrect");
            }
          }
        })
      }
    })
  })
})