const mongoose = require("mongoose");
const chatItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Group must have to name"],
    unique: true,
  },
  membership: {
    type: String,
    required: true,
    enum: ["1-1", "1-M", "M-M"],
  },
  admin: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  isFavoriate: {
    type: Boolean,
    default: false,
  },
  members: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
});
module.exports = mongoose.model("CItem", chatItemSchema);
