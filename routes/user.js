const router = require("express").Router();

const { createUser, login } = require("../controllers/user");
const auth = require("../middlewares/auth");

// router.get("/", getUsers);
// router.get("/:userId", getUser);
// router.post("/", createUser);

router.post("/signin", auth, login);
router.post("/signup", auth, createUser);

module.exports = router;
