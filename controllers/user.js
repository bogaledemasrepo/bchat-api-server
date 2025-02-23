const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/user");
const AppError = require("./HandlError");
const catchAsync = require("../middleware/CatchAsync");
const signUp = catchAsync(async (req, res, next) => {
  const { fullname, email, profile, password } = req.body;
  if (!fullname || !email || !password)
    return next(new AppError("Please provide all required data.", 400));

  const isEmailReserved = await User.findOne({ email });
  if (isEmailReserved) return next(new AppError("Enterd email reserved.", 400));
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);
  const signUp = new User({ fullname, email, profile, password: passwordHash });
  const resp = await signUp.save();
  if (resp) {
    const token = jwt.sign({ email }, process.env.SECRET);
    ["password", "friends", "chats", "explorable", "galery", "__v"].forEach(
      (Item) => {
        resp[Item] = undefined;
      }
    );

    res.status(200).json({
      status: "success",
      token,
      data: resp,
    });
  }
});

const signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("Please provide full creadential", 400));
  const searchUserByEmail = await User.findOne({ email });
  if (!searchUserByEmail)
    return next(new AppError("Invalid email or password!", 404));
  console.log(email, password, searchUserByEmail);
  const isAuthenticated = await searchUserByEmail.comparePassword(password);
  if (!isAuthenticated)
    return next(new AppError("Invalid email or password!", 404));
  ["password", "friends", "chats", "explorable", "galery", "__v"].forEach(
    (Item) => {
      searchUserByEmail[Item] = undefined;
    }
  );

  return res.status(200).json({
    status: "success",
    token: jwt.sign({ email }, process.env.SECRET),
    data: {
      ...searchUserByEmail._doc,
    },
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const explorable = await User.find({}, { email: 1, fullname: 1, profile: 1 });
  res.json({ status: "success", data: [...explorable] });
});
const getExplorableUser = catchAsync(async (req, res) => {
  const explorable = await User.find(
    { explorable: true },
    { email: 1, fullname: 1, profile: 1 }
  );
  res.json({ status: "success", data: [...explorable] });
});
module.exports = { signIn, signUp, getExplorableUser, getAllUser };
