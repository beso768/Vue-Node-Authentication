const { Router } = require("express");
const authController = require("../controllers/authController");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = Router();

router.get("/auth/me", isAuthenticated, authController.whoami);
router.post("/auth/sign-up", authController.signup);
router.post("/auth/sign-in", authController.signin);
router.post("/auth/sign-out", isAuthenticated, authController.signout);
router.delete(
  "/auth/users/:userId",
  isAuthenticated,
  authController.delete_user
);
router.put("/auth/users/:userId", isAuthenticated, authController.update_user);

module.exports = router;
