const { createToken, handleErrors } = require("../helpers");
const User = require("../models/User");

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
