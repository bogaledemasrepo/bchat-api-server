const express = require("express");
const CItem = require("../controllers/CItem");
// CHAT DETAIL ROUTES
const CIRoutes = express.Router();
CIRoutes.get("/all-chatItems", CItem.getAllChatItems);
CIRoutes.get("/1-1-chatItems", CItem.getAllPersonalChatItems);
CIRoutes.get("/m-m-chatItems", CItem.getAllGroupChatItems);
CIRoutes.get("/favorite", CItem.getFavoriateChatItems);
CIRoutes.post("/1-1-chatItems", CItem.createPersonalChatItem);
CIRoutes.post("/m-m-chatItems", CItem.createGroupChatItem);
CIRoutes.patch("/:chatItemId", CItem.deleteFromChatItem);
CIRoutes.delete("/:chatItemId", CItem.deleteFromChatItem);

module.exports = { CIRoutes };
