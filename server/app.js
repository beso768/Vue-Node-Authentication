const express = require("express");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const config = require("./config");
const { connectDb } = require("./helpers");
const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

connectDb().then(() => {
  console.log("connected to db");
  app.listen(config.port);
});

app.use(authRoutes);
