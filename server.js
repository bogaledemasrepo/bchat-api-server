require("dotenv").config({ path: [".env.local", ".env"] });

const express = require("express");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 3000;

app.use("/profile", routes.profileRoutes);
app.use("/users", routes.userRoutes);
app.use("/chats", routes.chatRoutes);
app.use("/friends", routes.friendRoutes);
app.use("/chatGroup", routes.chatGroupRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});
