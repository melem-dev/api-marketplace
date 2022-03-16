if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
require("./configs/mongoose");

const routes = require("./routes");

const { log } = require("./utils");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(PORT, () => log("server on"));
