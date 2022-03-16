const { Schema, model: Model } = require("mongoose");

const schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true },
);

const model = Model("products", schema);

module.exports = model;
