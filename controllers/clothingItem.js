const { STATUS_CODES } = require("../utils/errors");
const ClothingItem = require("../models/clothingItem");
const {
  NotFoundError,
  BadRequestError,
  ForBiddenError,
} = require("../utils/errors");

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
        next(new BadRequestError("Invalid data"));
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
      return next(new ForBiddenError("Forbidden"));
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid ID"));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item Not Found"));
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
        throw new NotFoundError("Card not found");
      } else {
        res.send(card);
      }
    })
    .catch((error) => {
      if (error.name === "CastError") {
        next(new BadRequestError("Invalid ID"));
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
        throw new NotFoundError("Card not found");
      } else {
        res.send(card);
      }
    })
    .catch((error) => {
      if (error.name === "CastError") {
        next(new BadRequestError("Invalid data"));
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
