const jwt = require("jsonwebtoken");
const config = require("../config");

const requireAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, config.authentication.jwtSecret, (err, decodedToken) => {
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
