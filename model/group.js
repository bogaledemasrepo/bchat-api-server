const mongoose = require("mongoose");
const groupSchema = mongoose.Schema({
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
module.exports = mongoose.Model("Group", groupSchema);
// const temp = [
//   {
//     id: "groupid",
//     name: "groupname",
//     admin: "groupadmin",
//     members: ["lnasdlklk"],
//   },
// ];
