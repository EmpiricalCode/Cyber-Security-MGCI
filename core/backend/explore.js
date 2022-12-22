// Variables
const path = require("path");
const { promises: fs } = require("fs");

// Roots
const root = path.dirname("");
const publicRoot = path.resolve(root, "public");
const articlesRoot = path.resolve(root, "core/assets/articles");

// Variables
const info = {
  page: "/explore"
}

// Functions
async function getArticles(queries) {

  var articlesReturned = [];
  const files = await (fs.readdir(articlesRoot));

  for (let file of files) {

    const data = JSON.parse((await fs.readFile(path.resolve(articlesRoot, file), "utf-8")));
    var valid = true;

    for (const [query, value] of Object.entries(queries)) {
      if (typeof data.tags[query] == "string" && value != data.tags[query].toLowerCase()) {
        valid = false;
      }
    }

    if (valid) {
      articlesReturned.push(data);
    }
  }

  return articlesReturned;
}

function get(req, res) {
  res.sendFile(`${publicRoot}/html/explore.html`);
}

function post(req, res) {

  (async () => {
    var articlesReturned = await getArticles(req.query);
    res.send(JSON.stringify({ "articles": articlesReturned }));
  })();
}

// Exports
module.exports.info = info;
module.exports.get = get;
module.exports.post = post;