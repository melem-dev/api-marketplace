const { Schema, model: Model } = require("mongoose");

const schema = new Schema(
  {
    item: { type: String },
    price: { type: Number },
    quantity: { type: Number },
  },
  { timestamps: true },
);

const model = Model("order/item", schema);

module.exports = model;
