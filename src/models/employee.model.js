const { Schema, model: Model } = require("mongoose");

const schema = new Schema(
  {
    userId: { type: String, unique: true, required: true },
  },
  { timestamps: true },
);

const model = Model("employees", schema);

module.exports = model;
