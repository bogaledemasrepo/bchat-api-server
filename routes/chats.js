const express = require("express");
const chatRoutes = express.Router();
chatRoutes.get("/allMyChat", (req, res) => {});
chatRoutes.get("/withFriend/:userId", (req, res) => {});
chatRoutes.get("/withGroup/:groupId", (req, res) => {});
chatRoutes.post("/toGroup/:groupId", (req, res) => {});
chatRoutes.post("/toFriend/:userId", (req, res) => {});
module.exports = { chatRoutes };
