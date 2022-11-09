module.exports = {
  port: process.env.PORT || 3000,
  db: {
    name: process.env.DB_NAME || "beso",
    password: process.env.DB_PASS || "beso123",
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || "secret",
  },
  email_hostname: "@newage.io",
};
