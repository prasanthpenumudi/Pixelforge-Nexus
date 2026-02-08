const router = require("express").Router();

const {
  register,
  login,
  getAllUsers      // IMPORTANT: added import
} = require("../controllers/authcontroller.js");

const { verifyToken, allowRoles } = require("../middleware/authmiddleware");

router.post("/register", register);
router.post("/login", login);

router.get(
  "/users",
  verifyToken,
  allowRoles("admin","lead"),
  getAllUsers
);

module.exports = router;
