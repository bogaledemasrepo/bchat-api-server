require("dotenv").config({ path: [".env.local", ".env"] });
const express = require("express");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 3000;
const BASEURL = ["/bchat/api/v1"];
app.use(`${BASEURL}/profile`, routes.profileRoutes);
app.use(`${BASEURL}/users`, routes.userRoutes);
app.use(`${BASEURL}/chats`, routes.chatRoutes);
app.use(`${BASEURL}/friends`, routes.friendRoutes);
app.use(`${BASEURL}/chatGroups`, routes.chatGroupRoutes);

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});
