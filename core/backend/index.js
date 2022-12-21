// Variables
const path = require("path");

// Roots
const root = path.dirname("");
const publicRoot = path.resolve(root, "public");

// Variables
const info = {
  page: "/"
}

// Functions
function get(req, res) {
  res.sendFile(`${publicRoot}/html/index.html`);
}

function post(req, res) {
  
}

// Exports
module.exports.info = info;
module.exports.get = get;
module.exports.post = post;