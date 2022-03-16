const { Schema, model: Model } = require("mongoose");

/**
 * types
 * 0 - client
 * 1 - company
 */

const schema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    type: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const model = Model("users", schema);

module.exports = model;
