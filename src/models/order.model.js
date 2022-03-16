const { Schema, model: Model } = require("mongoose");

/**
 * status
 * 0 - accepted
 * 1 - pending
 * 2 - refused
 */

const schema = new Schema(
  {
    client: { type: String, required: true },
    items: [String],
    total: { type: Number },
    status: { type: Number },
  },
  { timestamps: true },
);

const model = Model("orders", schema);

module.exports = model;
