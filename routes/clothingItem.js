const router = require("express").Router();

const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

const auth = require("../middlewares/auth");

router.get("/", auth, getItems);
router.post("/", createItem);
router.put("/:id/likes", likeItem);
router.delete("/:id", deleteItem);
router.delete("/:id/likes", dislikeItem);

module.exports = router;
