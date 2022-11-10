const { Router } = require("express");
const authController = require("../controllers/authController");
const userhController = require("../controllers/userController");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = Router();

router.post("/api/auth/sign-up", authController.signup);
router.post("/api/auth/sign-in", authController.signin);
router.delete(
  "/api/users/:userId",
  isAuthenticated,
  userhController.delete_user
);
router.get("/api/auth/me", isAuthenticated, userhController.whoami);
router.put("/api/users/:userId", isAuthenticated, userhController.update_user);

module.exports = router;
