const mongoose = require("mongoose");
const friendRequesitSchema = new mongoose.Schema({
  requestedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  requestedTo: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  requestedAt: {
    type: Date,
    default: Date.now(),
  },
  requestStatus: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});
module.exports = mongoose.model("Friendrequesit", friendRequesitSchema);
