const express = require("express");
const Friend = require("../controllers/friend");

const friendRoutes = express.Router();

friendRoutes.get("/", Friend.getAllFriends);
friendRoutes.get("/requesit", Friend.getFriendRequesit);
friendRoutes.get("/requesitReplay", Friend.getFriendRequesitReplay);
friendRoutes.post("/requesit", Friend.makeFriendRequesit);
friendRoutes.post("/replayRequesit", Friend.makeFriendRequesitReplay);
friendRoutes.delete("/deleteFriend/:userId", Friend.deleteFriend);
module.exports = {
  friendRoutes,
};
