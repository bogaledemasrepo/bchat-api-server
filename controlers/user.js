const signUp = async (req, res) => {
  res.json({ msg: "Get explorable users" });
};
const signIn = async (req, res) => {
  res.json({ msg: "User Sign In" });
};
const getExplorableUser = async (req, res) => {
  res.json({ msg: "User Sign In" });
};
module.exports = { signIn, signUp, getExplorableUser };
