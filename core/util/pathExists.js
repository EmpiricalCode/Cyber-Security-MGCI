// Variables
const { promises: fs } = require("fs");

// Functions
async function pathExists(path) {
  var e = true;
  await fs.stat(path).catch((err) => {
    e = false;
  });

  return e;
}

module.exports = pathExists;