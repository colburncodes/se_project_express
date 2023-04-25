const { STATUS_CODES } = require("../utils/errors");
const ClothingItem = require("../models/clothingItem");

const ForBiddenError = require("../utils/errors/forbidden");
const ServerError = require("../utils/errors/server-error");
const NotFoundError = require("../utils/errors/not-found");
const BadRequestError = require("../utils/errors/bad-request");

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(next);
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
        next(new ServerError(err.message));
      }
    });
};

const deleteItem = (req, res, next) => {
  const { id } = req.params;

  ClothingItem.findById(id)
    .orFail()
    .then((item) => {
      if (item.owner.equals(req.user._id)) {
        return item.deleteOne(() => res.send(item));
      }
      return next(new ForBiddenError("Forbidden"));
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid ID"));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item Not Found"));
      } else {
        next(new ServerError(err.message));
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
        next(new ServerError(error.message));
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
        next(new ServerError(error.message));
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
