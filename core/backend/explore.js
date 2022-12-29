// Variables
const path = require("path");
const explore = require("express").Router();
const { promises: fs } = require("fs");

// Roots
const root = path.dirname("");
const publicRoot = path.resolve(root, "public");
const articlesRoot = path.resolve(root, "core/assets/articles");

// Functions
const getArticles = require(path.resolve(root, "core/util/getArticles.js"));

explore.get("/", (req, res) => {
  res.sendFile(`${publicRoot}/html/explore.html`);
});

explore.post("/", (req, res) => {

  (async () => {
    var articlesReturned = await getArticles(req.query);
    res.send(JSON.stringify({ "articles": articlesReturned }));
  })();
});

// Exports
module.exports.router = explore;
module.exports.url = "/explore";