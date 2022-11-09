const config = require("../config");
const mongoose = require("mongoose");

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

module.exports = {
  onlyLatinCharacters,
  calcMaxDate,
  isCorrectEmail,
  connectDb,
};
