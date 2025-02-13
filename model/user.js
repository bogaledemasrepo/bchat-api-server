const mongoose = require("mongoose");
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
  profile: {
    type: String,
    default: "profile.png",
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
// userSchema.pre("save", async (req, res, next) => {
//   if (!this.isModifaid("password")) next();
//   const salt = await bcrypt.genSalt(12);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });
userSchema.methods.comparePassword = function (givenPassword) {
  return givenPassword === this.password;
  // retun new Promise((resolve,reject)=>{
  //   bcrypt.compare(givenPassword,this.password,(error,isMatch)=>{
  //     if(error){
  //       return reject(false)
  //     }
  //     if(!isMatch){
  //       return reject(false)
  //     }
  //     resolve(true)
  //   })
  // })
};
module.exports = mongoose.model("User", userSchema);

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
