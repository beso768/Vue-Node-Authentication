const config = require("../config");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

function onlyLatinCharacters(str) {
  return /^[a-zA-Z]+$/.test(str);
}

function calcMaxDate() {
  let eighteenYearsAgo = new Date();
  return eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
}

function isCorrectEmail(email) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false; //basic email validation
  if (email.split("@").pop() !== "newage.io") return false; //hostname validation
}

async function connectDb() {
  // database connection
  const dbURI = `mongodb+srv://${config.db.name}:${config.db.password}@cluster0.4fppqix.mongodb.net/?retryWrites=true&w=majority`;

  return mongoose
    .connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => console.log(err));
}

// handle errors
const handleErrors = (err) => {
  let errors = {};

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.match(/Validation failed/i)) {
    Object.values(err.errors).forEach((errObj) => {
      const prop = errObj.path ?? errObj.properties.path;
      errors[prop] = errObj.message;
    });
  }

  return errors;
};

const createToken = (id) => {
  return jwt.sign({ id }, config.authentication.jwtSecret, {
    expiresIn: 30 * 60,
  });
};

module.exports = {
  onlyLatinCharacters,
  calcMaxDate,
  isCorrectEmail,
  connectDb,
  handleErrors,
  createToken,
};
