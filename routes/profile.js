const express = require("express");
const Profile = require("../controllers/profile");

const profileRoutes = express.Router();
profileRoutes.delete("/deleteMe", Profile.deleteMyProfile);
profileRoutes.patch("/updateMe", Profile.updateMyProfile);
module.exports = { profileRoutes };
