// Variables
const path = require("path");
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

// Roots
const root = path.dirname("");
const publicRoot = path.resolve(path.dirname(""), "public");

// App Setup
app = express();
app.use(express.static(publicRoot));
app.use(bodyParser.json());

// App Main
fs.readdirSync(`${root}/core/backend`).forEach( (fileName) => {
  
  const backendHandler = require(`${root}/core/backend/${fileName}`);
  
  app.get(backendHandler.info.page, (req, res) => {
    backendHandler.get(req, res);
  });

  app.post(backendHandler.info.page, (req, res) => {
    backendHandler.post(req, res);
  });
})
  

app.listen(3001);