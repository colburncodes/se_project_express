const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  createUser,
  login,
  getCurrentUser,
  updateUser,
} = require("../controllers/user");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateUser);
router.post("/signin", auth, login);
router.post("/signup", auth, createUser);

module.exports = router;
