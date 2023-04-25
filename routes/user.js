const router = require("express").Router();
const auth = require("../middlewares/auth");

const { getUser, updateUser } = require("../controllers/user");
const { validateUserUpdateBody } = require("../middlewares/validation");

router.get("/me", auth, getUser);
router.patch("/me", auth, validateUserUpdateBody, updateUser);


module.exports = router;
