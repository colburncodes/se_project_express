/* eslint-disable no-console */
const ClothingItem = require("../models/clothingItem");

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .orFail()
    .then((items) => res.status(200).send({ data: items }))
    .catch((error) => {
      next(error);
    });
};

const findById = (req, res, next) => {
  const { id } = req.params;

  ClothingItem.findById(id)
    .orFail()
    .then((item) => {
      if (!item) {
        res.status(404).send({ message: "Item not found " });
      }
      res.status(200).send(item);
    })
    .catch((error) => {
      next(error);
    });
};

const createItem = (req, res, next) => {
  const userId = req.user._id;
  console.log(userId);

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: userId })
    .orFail()
    .then((item) => {
      console.log(item);
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: err.message });
      } else {
        next(err);
      }
    });
};

const updateItem = (req, res, next) => {
  const { id } = req.params;
  const { name, weather, imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(id, { $set: { name, weather, imageUrl } })
    .orFail()
    .then((item) => res.status(200).send({ item }))
    .catch((error) => {
      next(error);
    });
};

const deleteItem = (req, res, next) => {
  const { id } = req.params;

  ClothingItem.findByIdAndDelete(id)
    .orFail()
    .then((item) => res.status(204).send(item))
    .catch((error) => {
      next(error);
    });
};

const likeItem = (req, res, next) => {
  const { id } = req.params;

  ClothingItem.findByIdAndUpdate(
    id,
    { $addToSet: { like: req.user._id } },
    { new: true }
  )
    .then((item) => res.status(200).send(item))
    .catch((error) => {
      next(error);
    });
};

const dislikeItem = (req, res, next) => {
  const { id } = req.params;

  ClothingItem.findByIdAndUpdate(
    id,
    { $pull: { like: req.user._id } },
    { new: true }
  )
    .then((item) => res.status(200).send(item))
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  getItems,
  findById,
  createItem,
  likeItem,
  dislikeItem,
  updateItem,
  deleteItem,
};
