const { Router } = require("express");
const authController = require("../controllers/authController");
const userhController = require("../controllers/userController");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = Router();

router.post("/auth/sign-up", authController.signup);
router.post("/auth/sign-in", authController.signin);
router.delete(
  "/auth/users/:userId",
  isAuthenticated,
  userhController.delete_user
);
router.get("/auth/me", isAuthenticated, userhController.whoami);
router.put("/auth/users/:userId", isAuthenticated, userhController.update_user);

module.exports = router;
