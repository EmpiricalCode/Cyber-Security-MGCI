// Variables
const path = require("path");
const { promises: fs } = require("fs");

const root = path.dirname("");
const publicRoot = path.resolve(root, "public");
const articlesRoot = path.resolve(root, "core/assets/articles");

// Functions
async function getArticles(queries) {

  var articlesReturned = [];
  const files = await (fs.readdir(articlesRoot));

  for (let file of files) {

    const data = JSON.parse((await fs.readFile(path.resolve(articlesRoot, file), "utf-8")));
    var valid = true;

    for (const [query, value] of Object.entries(queries)) {
      if (query == "keywords") {
        if (!data.title.toLowerCase().includes(value) && !data.description.toLowerCase().includes(value)) {
          valid = false;
        }
      } else if (typeof data.tags[query] == "string" && value != data.tags[query].toLowerCase()) {
        valid = false;
      }
    }

    if (valid) {
      articlesReturned.push(data);
    }
  }

  return articlesReturned;
}

module.exports = getArticles;