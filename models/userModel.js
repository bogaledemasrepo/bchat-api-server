const bycrpt = require("bcrypt");
const mongoose = require("mongoose");
const userSchama = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profile: String,
  password: {
    type: String,
    required: true,
  },
  friends: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
});
userSchama.pre("save", function (next) {
  const user = this;
  if (!user.isModified) {
    next();
  }
  // Generate bycrp salt
  bycrpt.genSalt(10, (err, salt) => {
    bycrpt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
userSchama.methods.comparePassword = async function (psd) {
  const istrue = await bycrpt.compare(psd, this.password);
  return istrue;
};
userSchama.pre(/^find/g, function (next) {
  this.select("-password -__v");
  next();
});
const User = mongoose.model("User", userSchama);

module.exports = User;
