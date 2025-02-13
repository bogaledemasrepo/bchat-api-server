const jwt = require("jsonwebtoken");
const User = require("../model/user");

const signUp = async (req, res) => {
  try {
    const { fullname, email, profile, password } = req.body;
    const signUp = new User({ fullname, email, profile, password });
    const resp = await signUp.save();
    console.log(resp);
    if (resp) {
      const token = jwt.sign({ email }, process.env.SECRET);
      res.status(200).json({
        success: true,
        data: { token, ...resp._doc },
      });
    }
  } catch (error) {
    res.status(501).json({ success: false, error });
  }
};
const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({
      msg: "Please provide full creadential",
    });
  }
  const searchUserByEmail = await User.findOne({ email });
  if (!searchUserByEmail) {
    return res.status(404).json({
      msg: "Invalid email or password!",
    });
  }
  const isAuthenticated = await searchUserByEmail.comparePassword(password);
  if (!isAuthenticated) {
    return res.status(404).json({
      msg: "Invalid email or password!",
    });
  }
  return res.status(200).json({
    success: true,
    data: {
      token: jwt.sign({ email }, process.env.SECRET),
      ...searchUserByEmail._doc,
    },
  });
};
const getExplorableUser = async (req, res) => {
  const explorable = await User.find({ explorable: true });
  res.json({ success: true, data: [...explorable] });
};
module.exports = { signIn, signUp, getExplorableUser };
