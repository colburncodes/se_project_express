const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

const { validateIds, validateCardBody } = require("../middlewares/validation");

router.get("/", getItems);
router.post("/", auth, validateCardBody, createItem);
router.put("/:id/likes", auth, validateIds, likeItem);
router.delete("/:id", auth, validateIds, deleteItem);
router.delete("/:id/likes", auth, validateIds, dislikeItem);

module.exports = router;
