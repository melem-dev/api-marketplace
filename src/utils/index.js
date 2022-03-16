const jwt = require("./jwt");

module.exports = {
  log: (msg) => {
    const hour = new Date().toLocaleString("pt-br").split(" ")[1];
    console.log(`[${hour}] ${msg}`);
  },
  jwt,
};
