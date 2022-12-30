// Variables
const path = require("path");
const articles = require("express").Router();
const { promises: fs } = require("fs");

// Roots
const root = path.dirname("");
const publicRoot = path.resolve(root, "public");
const articlesRoot = path.resolve(root, "core/assets/articles");

// Functions
const getArticles = require(path.resolve(root, "core/util/getArticles.js"));
const pathExists = require(path.resolve(root, "core/util/pathExists.js"));

articles.get("/", (req, res) => {
  res.send("404");
});

articles.get("/:articleId", (req, res) => {
  (async () => {
    if (await pathExists(path.resolve(articlesRoot, `${req.params.articleId}.json`))) {
      res.sendFile(`${publicRoot}/html/articles.html`);
    }
  })();
});

articles.post("/:articleId", (req, res) => {
  (async () => {
    if (await pathExists(path.resolve(articlesRoot, `${req.params.articleId}.json`))) {
      const data = await fs.readFile(path.resolve(articlesRoot, `${req.params.articleId}.json`), "utf-8");
      res.send(data);
    }
  })();
});

// Exports
module.exports.router = articles;
module.exports.url = "/articles";