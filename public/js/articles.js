// Variables
var articleBody = document.getElementById("article-body");

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

  var title = document.createElement("h1");
  title.innerHTML = data.title;
  title.id = "title";
  articleBody.appendChild(title);

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
})