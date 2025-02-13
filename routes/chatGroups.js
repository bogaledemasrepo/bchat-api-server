const express = require("express");
const Control = require("../controllers/chatGroup");
const chatGroupRoutes = express.Router();

chatGroupRoutes.get("/", Control.fetchUserChatGroups);
chatGroupRoutes.post("/", Control.createChatGroup);
chatGroupRoutes.post("/:userId", Control.addUserToChatGroup);
chatGroupRoutes.delete("/:groupId", Control.deleteUserFromChatGroup);

module.exports = { chatGroupRoutes };
