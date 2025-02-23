require("dotenv").config({ path: [".env.local", ".env"] });
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const isAutherized = require("./middleware/isAutherized");
const notFound = require("./routes/NotFound");
const handleError = require("./middleware/HandleError");
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
app.use(cors());
app.use(express.json());
app.use(`${BASEURL}/users`, routes.userRoutes);
app.use(`${BASEURL}/friends`, isAutherized, routes.friendRoutes);
app.use(`${BASEURL}/profile`, isAutherized, routes.profileRoutes);
app.use(`${BASEURL}/chatDetail`, isAutherized, routes.CDRoutes);
app.use(`${BASEURL}/chatItem`, isAutherized, routes.CIRoutes);
app.all("*", notFound);

app.use(handleError);

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});
