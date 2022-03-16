const jwt = require("./jwt");
const b64 = require("./base64");

module.exports = {
  log: (msg) => {
    const hour = new Date().toLocaleString("pt-br").split(" ")[1];
    console.log(`[${hour}] ${msg}`);
  },
  jwt,
  b64,
};
