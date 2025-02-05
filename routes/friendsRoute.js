const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const express = require("express");

const friendRouter = express.Router();
friendRouter.post("/addFriend", async (req, res) => {
  const { friends } = await User.findById(req.user._id).select("friends");
  if (!friends.includes(req.user._id)) {
    const responce = await User.findOneAndUpdate(
      {
        _id: req.user._id,
      },
      { friends: [...friends, req.user._id] },
      { new: true, runValidators: true }
    );
    return res.json({ success: true, responce });
  }
  return res.json({ success: false, msg: "Already your friend" });
});
friendRouter.post("/blockFriend", async (req, res) => {
  const { friends } = await User.findById(req.user._id).select("friends");
  const upfriends = friends.filter((Item) => Item === req.user._id);
  const responce = await User.findOneAndUpdate(
    {
      _id: req.user._id,
    },
    { friends: [...upfriends] },
    { new: true, runValidators: true }
  );

  return res.json({ success: true, responce });
});
friendRouter.get("/:id", (req, res) => {});
friendRouter.post("/:id", (req, res) => {});

module.exports = friendRouter;
