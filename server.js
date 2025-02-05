const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const friendRouter = require("./routes/friendsRoute");
const { default: mongoose } = require("mongoose");
const {
  handleUserRegistration,
  handleUserLogin,
  getAllUsers,
} = require("./controllers/userControler");
const app = express();
app.use(express.json());
const DBURL = "mongodb://localhost:27017/bchatapi";

mongoose.connect(DBURL);
mongoose.connection.on("connected", () => {
  console.log("Database seccessfully connected!");
});
mongoose.connection.on("error", (err) => {
  console.log("Database connection error!", err);
});
const APIVERSION = ["/bechat/api/v1"];
const generalRouter = express.Router();

generalRouter.post("/signIn", handleUserLogin);
generalRouter.post("/signUp", handleUserRegistration);
generalRouter.get("/users", getAllUsers);
generalRouter.use("/friends", friendRouter);

generalRouter.get("/", (req, res) => {
  res.send({ name: "hallo wellcome!" });
});

app.use(APIVERSION[0], generalRouter);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const signInHandler = (param) => {
  console.log(param);
};
const signUpHandler = (param) => {
  console.log(param);
};
const getMyFriendsHandler = (param) => {
  console.log(param);
};
const getExplorableUsersHandler = () => {};
const getChatHistory = () => {};

io.on("connection", (socket) => {
  socket.emit("wellcome", "Wellcome to BChat App");
  socket.on("/signIn", (msg) => signInHandler(msg));
  socket.on("/signUp", (msg) => signUpHandler(msg));
  socket.on("/addFriend", (msg) => signUpHandler(msg));
  socket.on("/chats", (msg) => signUpHandler(msg));
  socket.on("/chats/groupId", (msg) => signUpHandler(msg));
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
server.listen(3000, () => {
  console.log("Server running on port 3000");
});
