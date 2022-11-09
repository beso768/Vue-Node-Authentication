const User = require("../models/User");
const jwt = require("jsonwebtoken");

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
    console.log(err.errors);
    Object.values(err.errors).forEach((errObj) => {
      const prop = errObj.path ?? errObj.properties.path;
      errors[prop] = errObj.message;
    });
  }

  return errors;
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id, firstName, lastName, birthday, email) => {
  return jwt.sign(
    { id, firstName, lastName, birthday, email },
    "net ninja secret",
    {
      expiresIn: maxAge,
    }
  );
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
    const token = createToken(user._id, firstName, lastName, birthday, email);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
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
    const token = createToken(_id, firstName, lastName, birthday, email);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(201).json({ id: _id, firstName, lastName, birthday, email });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.whoami = (req, res) => {
  res.status(200).json({ user: res.locals.user });
};

module.exports.signout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ user: null });
};

module.exports.delete_user = async (req, res) => {
  if (res.locals.user.id !== req.params.userId) {
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
      res.cookie("jwt", "", { maxAge: 1 });
      res.status(200).json({ user });
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.update_user = async (req, res) => {
  if (res.locals.user.id !== req.params.userId) {
    return res.status(401).json({ errors: "You can not modify this account" });
  }

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { lastName: req.body.lastname, firstName: req.body.firstName },
      { runValidators: true }
    ).select({
      password: 0,
    });
    res.status(200).json({ user });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
