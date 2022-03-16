const { Schema, model: Model } = require("mongoose");

const schema = new Schema(
  {
    userId: { type: String },
    purchases: [String],
  },
  { timestamps: true },
);

const model = Model("clients", schema);

module.exports = model;
