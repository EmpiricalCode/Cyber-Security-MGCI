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

// Exports
module.exports.info = info;
module.exports.get = get;