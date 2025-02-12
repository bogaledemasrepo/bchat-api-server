const express = require("express");

const profileRoutes = express.Router();
profileRoutes.post("deleteMe", (req, res) => {});
profileRoutes.post("updateMe", (req, res) => {});
module.exports = { profileRoutes };
