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
    .then((item) => res.status(200).send(item))
    .catch((error) => {
      next(error);
    });
};

const createItem = (req, res, next) => {
  console.log(req.user._id);

  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl })
    .orFail()
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((error) => {
      next(error);
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
