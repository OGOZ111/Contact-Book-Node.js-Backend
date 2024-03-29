const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    message: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
