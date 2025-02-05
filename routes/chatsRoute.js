const express = require("express");

const chatRouter = express.Router();
chatRouter.get("/", (req, res) => {});
chatRouter.post("/:id", (req, res) => {});
chatRouter.get("/:id", (req, res) => {});

module.exports = chatRouter;
