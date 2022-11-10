const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config");
let refreshTokens = [];

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
    expiresIn: 10,
  });
};

module.exports.signup = async (req, res) => {
  const { firstName, lastName, birthday, email, password } = req.body;
  try {
    const user = await User.create({
      firstName,
      lastName,
      birthday,
      email,
      password,
    });
    const token = createToken(user._id);
    res
      .status(201)
      .json({ id: user._id, firstName, lastName, birthday, email, token });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { _id, firstName, lastName, birthday } = await User.login(
      email,
      password
    );
    const token = createToken(_id);

    res
      .status(201)
      .json({ id: _id, firstName, lastName, birthday, email, token });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.whoami = async ({ user }, res) => {
  try {
    const userObj = await User.findOne({ _id: user._id });
    res.status(200).json({
      id: userObj._id,
      firstName: userObj.firstName,
      lastName: userObj.lastName,
      birthday: userObj.birthday,
      email: userObj.email,
    });
  } catch (error) {}
};

module.exports.signout = (req, res) => {
  res.status(204).json({ user: null });
};

module.exports.delete_user = async (req, res) => {
  if (req.user.id !== req.params.userId) {
    return res.status(401).json({ errors: "You can not delete this account" });
  }

  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId }).select(
      {
        password: 0,
      }
    );

    if (user == null || user.deletedCount === 0) {
      res.status(404).json({ errors: "User doesn't exist" });
    } else {
      res.status(200).json({ user });
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.update_user = async (req, res) => {
  if (req.user.id !== req.params.userId) {
    return res.status(401).json({ errors: "You can not modify this account" });
  }

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { lastName: req.body.lastname, firstName: req.body.firstName },
      { runValidators: true }
    );
    res.status(200).json({
      id: user._id,
      lastName: req.body.lastname,
      firstName: req.body.firstName,
      email: user.email,
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
