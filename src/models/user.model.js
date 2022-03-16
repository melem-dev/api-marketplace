const { Schema, model: Model } = require("mongoose");
const bcrypt = require("bcrypt");

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

schema.pre("save", function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = bcrypt.hashSync(this.password, 8);
});

schema.pre("findOneAndUpdate", function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = bcrypt.hashSync(this.password, 8);
});

const model = Model("users", schema);

module.exports = model;
