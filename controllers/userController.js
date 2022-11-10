const { handleErrors } = require("../helpers");
const User = require("../models/User");

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
