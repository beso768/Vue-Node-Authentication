const { Router } = require("express");
const authController = require("../controllers/authController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = Router();

router.get("/me", requireAuth, authController.whoami);
router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/signout", requireAuth, authController.signout);
router.delete("/users/:userId", requireAuth, authController.delete_user);
router.put("/users/:userId", requireAuth, authController.update_user);

module.exports = router;
