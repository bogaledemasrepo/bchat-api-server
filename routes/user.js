const express = require("express");
const userRoutes = express.Router();
userRoutes.get("users/explorable", (req, res) => {});
userRoutes.get("users/myFriend", (req, res) => {});
userRoutes.post("signIn", (req, res) => {});
userRoutes.post("signUp", (req, res) => {});

module.exports = { userRoutes };
