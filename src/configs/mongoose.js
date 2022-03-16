const mongodb = require("mongoose");
const { log } = require("../utils");

const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_CLUSTER}/${process.env.DB_COL}?retryWrites=true&w=majority`;

mongodb.connect(
  URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      throw err;
    }
    log("Mongodb Connected!");
  },
);

module.exports = mongodb;
