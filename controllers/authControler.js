const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
async function checkUserAutorization(req, res, next) {
  const { autherization } = req.headers;
  jwt.verify(
    autherization,
    process.env.JWTTOKEN,
    async function (err, decoded) {
      if (err)
        return res
          .status(404)
          .json({ msg: "Unauthoried please sign in first" });
      if (!decoded)
        return res
          .status(404)
          .json({ msg: "Unauthoried please sign in first" });
      const user = await User.findOne({ email: decoded.email }).select(
        "-__v -password -friends"
      );
      req.user = user;
      next();
    }
  );
}
module.exports = {
  checkUserAutorization,
};
