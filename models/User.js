const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const latinRegex = /[a - zA - Z]/;

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter a firstName"],
    validate: [
      (value) => value.match(latinRegex),
      "Firstname must only include Latin characters [a-zA-Z]",
    ],
  },
  lastName: {
    type: String,
    required: [true, "Please enter an lastName"],
    validate: [
      (value) => value.match(latinRegex),
      "Firstname must only include Latin characters [a-zA-Z]",
    ],
  },
  birthday: {
    type: String,
    required: [true, "Please enter an birthday"],
    validate: [
      (value) => {
        const date = new Date(value);
        if (!date instanceof Date && isNaN(date)) {
          return false;
        }
        // const minDate =  new Date('01-01-1920')

        // if(minDate < date){
        //   return false
        // }

        return true;
      },
      (value) => {
        const date = new Date(value);
        if (!date instanceof Date && isNaN(date)) {
          return false;
        }
        // const minDate =  new Date('01-01-1920')

        // if(minDate < date){
        //   return false
        // }

        return false;
      },
      "Birthday must only be in 'dd/mm/yyyy'",
    ],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
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
