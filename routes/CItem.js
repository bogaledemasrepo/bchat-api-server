const express = require("express");
const CItem = require("../controllers/CItem");
// CHAT DETAIL ROUTES
const CIRoutes = express.Router();
CIRoutes.get("/all-chatItems", CItem.getAllChatItems);
CIRoutes.get("/1-1-chatItems", CItem.getAllPersonalChatItems);
CIRoutes.get("/m-m-chatItems", CItem.getAllGroupChatItems);

CIRoutes.post("/1-1-chatItems", CItem.createPersonalChatItem);
CIRoutes.post("/m-m-chatItems", CItem.createGroupChatItem);

// CIRoutes.patch("/1-1-chatItems/:chatItemId", CItem.getChatDetailWithFriend);
// CIRoutes.patch("/m-m-chatItems/:chatItemId", CItem.getMyChatWithGroups);

CIRoutes.delete("/1-1-chatItems/:chatItemId", CItem.deleteFromChatItem);

module.exports = { CIRoutes };
