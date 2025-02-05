require("dotenv").config({ path: [".env.local", ".env"] });
const jwt = require("jsonwebtoken");
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
const socketHandler = require("./controllers/socketControler");
const { checkUserAutorization } = require("./controllers/authControler");
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
const authrizedRouter = express.Router();
const nonAuthrizedRouter = express.Router();

nonAuthrizedRouter.post("/signIn", handleUserLogin);
nonAuthrizedRouter.post("/signUp", handleUserRegistration);

authrizedRouter.get("/users", getAllUsers);
authrizedRouter.use("/friends", friendRouter);

app.use(APIVERSION[0], nonAuthrizedRouter);
app.use(checkUserAutorization);
app.use(APIVERSION[0], authrizedRouter);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", socketHandler);
server.listen(3000, () => {
  console.log("Server running on port 3000");
});
