const { STATUS_CODES } = require("../utils/errors");
const ClothingItem = require("../models/clothingItem");

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(STATUS_CODES.Ok).send(items))
    .catch((error) => {
      next(error);
    });
};

const createItem = (req, res, next) => {
  const userId = req.user._id;

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: userId })
    .then((item) => {
      res.status(STATUS_CODES.Ok).send(item);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(STATUS_CODES.BadRequest).send({ message: "Invalid Data" });
      } else {
        next(err);
      }
    });
};

const deleteItem = (req, res, next) => {
  const { id } = req.params;

  ClothingItem.findById(id)
    .orFail()
    .then((item) => {
      if (item.owner.equals(req.user._id)) {
        return item.deleteOne(() => res.send({ clothingItem: item }));
      }
      return res.status(STATUS_CODES.Forbidden).send({
        message: "Forbidden",
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(STATUS_CODES.BadRequest).send({ message: "Invalid Id" });
      } else if (err.name === "DocumentNotFoundError") {
        res.status(STATUS_CODES.NotFound).send({ message: "Item not found" });
      } else {
        res
          .status(STATUS_CODES.ServerError)
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
        res.status(STATUS_CODES.NotFound).send({ message: "Card not found" });
      } else {
        res.send(card);
      }
    })
    .catch((error) => {
      if (error.name === "CastError") {
        res
          .status(STATUS_CODES.BadRequest)
          .send({ message: "No card with Id" });
      } else {
        res
          .status(STATUS_CODES.ServerError)
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
        res.status(STATUS_CODES.NotFound).send({ message: "Card not found" });
      } else {
        res.send(card);
      }
    })
    .catch((error) => {
      if (error.name === "CastError") {
        res
          .status(STATUS_CODES.BadRequest)
          .send({ message: "No card with Id" });
      } else {
        res
          .status(STATUS_CODES.ServerError)
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
