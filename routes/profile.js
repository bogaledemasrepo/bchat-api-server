const express = require("express");
const Profile = require("../controllers/profile");
const upload = require("../middleware/uploadProfile");
const profileRoutes = express.Router();
profileRoutes.get("/", Profile.getMyProfile);
profileRoutes.post("/upload", upload, Profile.profileUpload);
profileRoutes.delete("/deleteMe", Profile.deleteMyProfile);
profileRoutes.patch("/updateMe", Profile.updateMyProfile);
module.exports = { profileRoutes };
