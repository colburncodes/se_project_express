const router = require("express").Router();
const { STATUS_CODES } = require("../utils/errors");
const clothingController = require("./clothingItem");
const userController = require("./user");
const auth = require("../middlewares/auth");
const {
  validateUserLogin,
  validateUserBody,
} = require("../middlewares/validation");

const { login, createUser } = require("../controllers/user");

router.post("/signin", validateUserLogin, login);
router.post("/signup", validateUserBody, createUser);

router.use("/items", clothingController);
router.use("/users", auth, userController);

router.use(auth, (req, res) => {
  res.status(STATUS_CODES.NotFound).send({ message: "Router not found" });
});

module.exports = router;
