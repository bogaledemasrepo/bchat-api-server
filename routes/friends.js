const express = require("express");
const friendRoutes = express.Router();
friendRoutes.get("/addRequesit", (req, res) => {});
friendRoutes.get("/requesitReplay", (req, res) => {});
friendRoutes.post("/addRequesit", (req, res) => {});
friendRoutes.post("/replayRequesit", (req, res) => {});
friendRoutes.post("/deleteFriend/:userId", (req, res) => {});
module.exports = {
  friendRoutes,
};
