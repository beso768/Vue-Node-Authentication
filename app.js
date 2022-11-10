const express = require("express");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const config = require("./config");
const { connectDb } = require("./helpers");
const app = express();
require("./passport");

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(authRoutes);

connectDb().then(() => {
  console.log("connected to db");
  app.listen(config.port);
});
