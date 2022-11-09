const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, "net ninja secret", (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.status(401).json({ errors: err.message });
      } else {
        res.locals.user = decodedToken;
        next();
      }
    });
  } else {
    res.locals.user = null;
    res.status(401).json({ errors: "Token is not provided" });
  }
};

module.exports = { requireAuth };
