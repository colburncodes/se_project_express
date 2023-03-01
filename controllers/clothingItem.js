const { ERROR_CODES } = require("../utils/errors");
const ClothingItem = require("../models/clothingItem");

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send({ data: items }))
    .catch((error) => {
      next(error);
    });
};

const createItem = (req, res, next) => {
  const userId = req.user._id;

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: userId })
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ERROR_CODES.BadRequest).send({ message: err.message });
      } else {
        next(err);
      }
    });
};

const deleteItem = (req, res, next) => {
  const { id } = req.params;

  ClothingItem.findByIdAndDelete(id)
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(ERROR_CODES.BadRequest).send({ message: "Invalid Id" });
      } else if (err.name === "DocumentNotFoundError") {
        res.status(ERROR_CODES.NotFound).send({ message: "Item not found" });
      } else {
        res
          .status(ERROR_CODES.ServerError)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

const likeItem = (req, res, next) => {
  const { id } = req.params;

  ClothingItem.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res.status(ERROR_CODES.NotFound).send({ message: "Card not found" });
      } else {
        res.send(card);
      }
    })
    .catch((error) => {
      if (error.name === "CastError") {
        res.status(ERROR_CODES.BadRequest).send({ message: "No card with Id" });
      } else {
        res
          .status(ERROR_CODES.ServerError)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

const dislikeItem = (req, res, next) => {
  const { id } = req.params;

  ClothingItem.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res.status(ERROR_CODES.NotFound).send({ message: "Card not found" });
      } else {
        res.send(card);
      }
    })
    .catch((error) => {
      if (error.name === "CastError") {
        res.status(ERROR_CODES.BadRequest).send({ message: "No card with Id" });
      } else {
        res
          .status(ERROR_CODES.ServerError)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

module.exports = {
  getItems,
  createItem,
  likeItem,
  dislikeItem,
  deleteItem,
};
