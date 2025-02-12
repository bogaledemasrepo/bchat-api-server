const express = require("express");
const User = require("../controlers/user");

const userRoutes = express.Router();

userRoutes.get("/explorable", User.getExplorableUser);
userRoutes.post("/signIn", User.signIn);
userRoutes.post("/signUp", User.signUp);

module.exports = { userRoutes };
