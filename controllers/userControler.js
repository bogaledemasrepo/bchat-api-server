const User = require("./../models/userModel");
const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const handleUserRegistration = async (req, res) => {
  const { fullname, email, profile, password } = req.body;
  try {
    const newUser = await User.create({ fullname, email, profile, password });
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.msg);
  }
};
const handleUserLogin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(404)
      .json({ message: "Please provide user email and password." });
  }
  const { email, password } = req.body;
  try {
    // Find user by email
    const responce = await User.findOne({ email: email });
    if (!responce)
      return res.status(404).json({ message: "Invalid email or password!" });
    // Check correct pasword
    const isAuthenticated = await responce.comparePassword(password);
    console.log(isAuthenticated, "hello hir");
    if (!isAuthenticated)
      return res.status(404).json({ message: "Invalid email or password!" });
    // Create a token for user
    const jwtPayload = { email };
    const jwtSecuredSecret = "Placed at env file";
    const token = jwt.sign(jwtPayload, jwtSecuredSecret);
    // Createa session
    res.status(200).json({ id: responce.id, token });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const responce = await User.find();

    if (res) return res.status(200).json({ success: true, responce });
    res.status(200).json({ message: "No user registerd!" });
  } catch (error) {
    res.status(400).json({ success: "false", error });
  }
};
module.exports = {
  getAllUsers,
  handleUserLogin,
  handleUserRegistration,
};
