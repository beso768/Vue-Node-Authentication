const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const {
  onlyLatinCharacters,
  calcMaxDate,
  isCorrectEmail,
} = require("../helpers");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter a firstName"],
    validate: [
      onlyLatinCharacters,
      "Firstname must only include Latin characters [a-zA-Z]",
    ],
  },
  lastName: {
    type: String,
    required: [true, "Please enter an lastName"],
    validate: [
      onlyLatinCharacters,
      "Firstname must only include Latin characters [a-zA-Z]",
    ],
  },
  birthday: {
    type: Date,
    required: [true, "Please enter an birthday"],
    min: "1920-01-01",
    max: calcMaxDate(),
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [
      (value) => isCorrectEmail(value),
      "Please provide correct Email(must be finished with @newage.io)",
    ],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
});

// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
