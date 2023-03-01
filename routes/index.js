const router = require("express").Router();
const { ERROR_CODES } = require("../utils/errors");
const clothingController = require("./clothingItem");
const userController = require("./user");

router.use("/items", clothingController);

router.use("/users", userController);

router.use((req, res) => {
  res.status(ERROR_CODES.NotFound).send({ message: "Router not found" });
});

module.exports = router;
