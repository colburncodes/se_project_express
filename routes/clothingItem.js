const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

router.get("/", getItems);
router.post("/", auth, createItem);
router.put("/:id/likes", auth, likeItem);
router.delete("/:id", auth, deleteItem);
router.delete("/:id/likes", auth, dislikeItem);

module.exports = router;
