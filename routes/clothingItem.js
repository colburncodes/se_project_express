const router = require("express").Router();

const {
  getItems,
  findById,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/clothingItem");

router.get("/", getItems);
router.get("/:id", findById);
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

module.exports = router;
