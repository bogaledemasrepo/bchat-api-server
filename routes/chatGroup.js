const express = require("express");

const chatGroupRoute = express.Router();
chatGroupRoute.get("/", (req, res) => {
  console.log("Hallo chat group!");
});

chatGroupRoute.post("/", (req, res) => {});
chatGroupRoute.post("/addUser/:userId", (req, res) => {});
chatGroupRoute.delete("/:groupId", (req, res) => {});
chatGroupRoute.patch("/:groupId", (req, res) => {});

module.exports = { chatGroupRoute };
