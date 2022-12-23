// Variables
const path = require("path");
const index = require("express").Router();

// Roots
const root = path.dirname("");
const publicRoot = path.resolve(root, "public");

// Variables
const info = {
  page: "/"
}

// Functions
index.get("/", (req, res) => {
  res.sendFile(`${publicRoot}/html/index.html`);
});

index.post("/", (req, res) => {
  
});

// Exports
module.exports.router = index;
module.exports.url = "/";