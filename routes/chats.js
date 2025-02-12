const express = require("express");
const Chat = require("../controlers/chat");

const chatRoutes = express.Router();

chatRoutes.get("/allMyChat", Chat.getAllMyChats);
chatRoutes.get("/withFriend/", Chat.getMyChatWithFriends);
chatRoutes.get("/withFriend/:userId", Chat.getChatDetailWithFriend);
chatRoutes.get("/withGroup/", Chat.getMyChatWithGroups);
chatRoutes.get("/withGroup/:groupId", Chat.getChatDetailWithGroup);
chatRoutes.post("/toGroup/:groupId", Chat.addChatDeatilToGroup);
chatRoutes.post("/toFriend/:userId", Chat.addChatDeatilToFriend);
chatRoutes.delete("/groupChat/:chatId", Chat.deleteChatDeatilFromGroupChat);
chatRoutes.delete("/friendChat/:chatId", Chat.deleteChatDeatilFromFriendChat);
chatRoutes.patch("/groupChat/:chatId", Chat.updateChatDeatilGroupChat);
chatRoutes.patch("/friendChat/:chatId", Chat.updateChatDeatilFriendChat);
module.exports = { chatRoutes };
