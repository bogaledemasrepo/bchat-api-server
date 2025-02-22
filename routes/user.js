const express = require("express");
const User = require("../controllers/user");
const isAutherized = require("../middleware/isAutherized");

const userRoutes = express.Router();
userRoutes.get("/", isAutherized, User.getAllUser);
userRoutes.get("/explorable", isAutherized, User.getExplorableUser);
userRoutes.post("/signIn", User.signIn);
userRoutes.post("/signUp", User.signUp);

module.exports = { userRoutes };
