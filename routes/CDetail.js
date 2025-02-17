const express = require("express");
const CDetail = require("../controllers/CDetail");
// CHAT ITEM ROUTES
const CDRoutes = express.Router();
CDRoutes.get("/:chatItemId", CDetail.getChatDetail);
CDRoutes.post("/", CDetail.createChatDetail);
CDRoutes.delete("/:chatItemId", CDetail.deleteChatDetail);
CDRoutes.patch("/:chatItemId", CDetail.updatChatDetail);

module.exports = { CDRoutes };
