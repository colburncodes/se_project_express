const router = require("express").Router();
const clothingController = require("./clothingItem");
const userController = require("./user");

router.use("/items", clothingController);

router.use("/users", userController);

router.use((req, res) => {
  res.status(500).send({ message: "Router not found" });
});

module.exports = router;
