const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "User must have name"],
  },
  email: {
    type: String,
    required: [true, "User must have email"],
    unique: [true, "Entered email is reserved please change it!"],
  },
  profile: {
    type: String,
    default: "profile.png",
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
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
});
userSchema.pre("save", (req, res, next) => {
  next();
});
module.exports = mongoose.Model("User", userSchema);

// const temp = [
//   {
//     id: "12weds34dw",
//     fullname: "bogale demas",
//     email: "bogiemail.gmail.com",
//     profile: "user.png",
//     password: "cjn53nj3n6klam09v8vhr898ahjk",
//     friends: ["bj523b2jb5"],
//     chats: ["bj523b2dfasjb5"],
//   },
// ];
