const router = require("express").Router();
const auth = require("../middlewares/auth");

const { getCurrentUser, updateUser } = require("../controllers/user");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateUser);


module.exports = router;
