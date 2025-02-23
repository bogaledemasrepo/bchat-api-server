const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "User must have name"],
  },
  email: {
    type: String,
    required: [true, "User must have email"],
    unique: [true, "Entered email is reserved please change it!"],
  },
  galery: [String],

  profile: {
    type: String,
    default: "default.png",
  },

  password: {
    type: String,
    validate: {
      validator: function () {
        return true;
      },
      message: "Password must have at list 8 character",
    },
  },
  friends: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  chats: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Chat",
    },
  ],
  explorable: {
    type: Boolean,
    default: true,
  },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  const salt = await bcrypt.genSalt(12);
  this.password = bcrypt.hash(this.password, salt);
  next();
});
userSchema.methods.comparePassword = async function (givenPassword) {
  return await bcrypt.compare(givenPassword, this.password);
};
module.exports = mongoose.model("User", userSchema);
