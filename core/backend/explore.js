// Variables
const path = require("path");

// Roots
const root = path.dirname("");
const publicRoot = path.resolve(root, "public");

// Variables
const info = {
  page: "/explore"
}

// Functions
function get(req, res) {
  res.sendFile(`${publicRoot}/html/explore.html`);
}

function post(req, res) {
  console.log(req.query);

  res.send(JSON.stringify({ "articles": ["sdfasdf", "sdfasdfasdf"] }));
}

// Exports
module.exports.info = info;
module.exports.get = get;
module.exports.post = post;