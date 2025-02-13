require("dotenv").config({ path: [".env.local", ".env"] });
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const isAutherized = require("./middleware/isAutherized");
const port = process.env.PORT || 3000;
const BASEURL = ["/bchat/api/v1"];

mongoose.connect(process.env.DBURI);
mongoose.connection.on("connected", () => {
  console.log("Database successfyuly connected!");
});
mongoose.connection.on("disconnected", () => {
  console.log("DB Error!");
});
const app = express();
app.use(express.json());
app.use(`${BASEURL}/users`, routes.userRoutes);
app.use(`${BASEURL}/profile`, isAutherized, routes.profileRoutes);
app.use(`${BASEURL}/chats`, isAutherized, routes.chatRoutes);
app.use(`${BASEURL}/friends`, isAutherized, routes.friendRoutes);
app.use(`${BASEURL}/chatGroups`, isAutherized, routes.chatGroupRoutes);

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});
