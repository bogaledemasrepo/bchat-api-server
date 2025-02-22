const User = require("../model/user");
const jwt = require("jsonwebtoken");
const isAutherized = async (req, res, next) => {
  const Auth = req.headers.authorization;
  if (!Auth)
    return res.status(404).json({ msg: "Unautherized please log in first" });
  try {
    const { email } = jwt.verify(Auth, process.env.SECRET);
    const user = await User.findOne(
      { email },
      { _id: 1, fullname: 1, email: 1, profile: 1 }
    );
    if (user) {
      req.user = user;
      next();
    } else
      return res.status(404).json({ msg: "Unautherized please log in first" });
  } catch (error) {
    return res.status(404).json({ msg: "Unautherized please log in first" });
  }
};
module.exports = isAutherized;
