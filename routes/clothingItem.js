const router = require("express").Router();

const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

router.get("/", getItems);
router.post("/", createItem);
router.put("/:id/likes", likeItem);
router.delete("/:id", deleteItem);
router.delete("/:id/likes", dislikeItem);

module.exports = router;
