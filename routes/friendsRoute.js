const express = require("express");

const friendRouter = express.Router();
friendRouter.get("/", (req, res) => {});
friendRouter.get("/:id", (req, res) => {});
friendRouter.post("/:id", (req, res) => {});

module.exports = friendRouter;
