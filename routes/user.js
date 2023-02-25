const router = require("express").Router();

const {
  getUsers,
  createUser,
  getUser,
  updateUser,
} = require("../controllers/user");

router.get("/", getUsers);
router.get("/:userId", getUser);
router.post("/", createUser);
router.put("/:userId", updateUser);

module.exports = router;
