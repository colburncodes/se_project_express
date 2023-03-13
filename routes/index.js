const router = require("express").Router();
const { STATUS_CODES } = require("../utils/errors");
const clothingController = require("./clothingItem");
const userController = require("./user");
const auth = require("../middlewares/auth");

const { login, createUser } = require("../controllers/user");

router.post("/signin", login);
router.post("/signup", createUser);

router.use("/items", clothingController);
router.use("/users", userController);

router.use(auth, (req, res) => {
  res.status(STATUS_CODES.NotFound).send({ message: "Router not found" });
});

module.exports = router;
