// Variables
const path = require("path");
const articles = require("express").Router();

// Roots
const root = path.dirname("");
const publicRoot = path.resolve(root, "public");

// Functions
articles.get("/", (req, res) => {
  res.sendFile(`${publicRoot}/html/articles.html`);
});

articles.get("/:articleId", (req, res) => {
  res.sendFile(`${publicRoot}/html/articles.html`);
});

articles.post("/", (req, res) => {

});

// Exports
module.exports.router = articles;
module.exports.url = "/articles";