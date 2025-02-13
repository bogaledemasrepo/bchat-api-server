const mongoose = require("mongoose");
const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Group must have to name"],
    unique: true,
  },
  admin: {
    type: String,
    required: [true, "Group must have admin"],
  },
  members: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
});
module.exports = mongoose.model("Group", groupSchema);
