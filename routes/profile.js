const express = require("express");
const Profile = require("../controllers/profile");

const profileRoutes = express.Router();
profileRoutes.get("/", Profile.getMyProfile);
profileRoutes.post("/upload", Profile.uploadProfilePhoto);
profileRoutes.delete("/deleteMe", Profile.deleteMyProfile);
profileRoutes.post("/updateMe", Profile.updateMyProfile);
module.exports = { profileRoutes };
