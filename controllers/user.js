const jwt = require("jsonwebtoken");
const User = require("../model/user");

const signUp = async (req, res) => {
  const { fullname, email, profile, password } = req.body;
  if (!fullname || !email || !password)
    return res.json({
      success: false,
      data: { msg: "Please provide all required data." },
    });
  try {
    const isEmailReserved = await User.findOne({ email });
    if (isEmailReserved) throw new Error("Enterd email reserved.");
    const signUp = new User({ fullname, email, profile, password });
    try {
      const resp = await signUp.save();
      console.log("TTTTTTTTTTTTTTTTTTTTT", signUp, resp);
    } catch (error) {
      console.log(error);
    }
    if (resp) {
      const token = jwt.sign({ email }, process.env.SECRET);
      ["password", "friends", "chats", "__v"].forEach((Item) => {
        resp[Item] = undefined;
      });
      res.status(200).json({
        success: true,
        token,
        data: resp,
      });
    }
  } catch (error) {
    res.status(405).json({ success: false, error });
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
  ["password", "friends", "chats", "__v"].forEach((Item) => {
    searchUserByEmail[Item] = undefined;
  });
  if (!isAuthenticated) {
    return res.status(404).json({
      msg: "Invalid email or password!",
    });
  }

  console.log("To send", searchUserByEmail);
  return res.status(200).json({
    success: true,
    token: jwt.sign({ email }, process.env.SECRET),
    data: {
      ...searchUserByEmail._doc,
    },
  });
};

const getAllUser = async (req, res) => {
  const explorable = await User.find({}, { email: 1, fullname: 1, profile: 1 });
  res.json({ success: true, data: [...explorable] });
};
const getExplorableUser = async (req, res) => {
  const explorable = await User.find(
    { explorable: true },
    { email: 1, fullname: 1, profile: 1 }
  );
  res.json({ success: true, data: [...explorable] });
};
module.exports = { signIn, signUp, getExplorableUser, getAllUser };
