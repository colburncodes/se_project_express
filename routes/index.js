const router = require("express").Router();
const clothingController = require("./clothingItem");
const userController = require("./user");
const auth = require("../middlewares/auth");
const {
  validateUserLogin,
  validateUserBody,
} = require("../middlewares/validation");
const NotFoundError = require("../utils/errors/not-found");

const { login, createUser } = require("../controllers/user");

router.post("/signin", validateUserLogin, login);
router.post("/signup", validateUserBody, createUser);

router.use("/items", clothingController);
router.use("/users", auth, userController);

router.use(auth, () => {
  throw new NotFoundError("Router Not Found");
});

module.exports = router;
