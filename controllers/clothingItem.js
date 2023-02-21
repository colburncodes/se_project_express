/* eslint-disable no-console */
const ClothingItem = require("../models/clothingItem");

const getItems = (req, res) => {
  ClothingItem.find({})
    .orFail()
    .then((items) => res.status(200).send({ data: items }))
    .catch((error) =>
      res.status(500).send({ message: "Error making request", error })
    );
};

const findById = (req, res) => {
  const { id } = req.params;

  ClothingItem.findById(id)
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((error) =>
      res.status(500).send({ message: "No clothing item found.", error })
    );
};

const createItem = (req, res) => {
  console.log(req.user._id);

  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl })
    .orFail()
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((error) => {
      res.status(500).send({ message: "Error creating item", error });
    });
};

const updateItem = (req, res) => {
  const { id } = req.params;
  const { name, weather, imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(id, { $set: { name, weather, imageUrl } })
    .orFail()
    .then((item) => res.status(200).send({ item }))
    .catch((error) =>
      res.status(400).send({ message: "Error updating item", error })
    )
    .catch((error) => res.status(500).send({ message: "Server Error", error }));
};

const deleteItem = (req, res) => {
  const { id } = req.params;

  ClothingItem.findByIdAndDelete(id)
    .orFail()
    .then((item) => res.status(204).send(item))
    .catch((error) =>
      res.status(500).send({ message: "Error Item Not Found", error })
    );
};

const likeItem = (req, res) => {
  const { id } = req.params;

  ClothingItem.findByIdAndUpdate(
    id,
    { $addToSet: { like: req.user._id } },
    { new: true }
  )
    .then((item) => res.status(200).send(item))
    .catch((error) =>
      res.status(500).send({ message: "Internal Server Error", error })
    );
};

const dislikeItem = (req, res) => {
  const { id } = req.params;

  ClothingItem.findByIdAndUpdate(
    id,
    { $pull: { like: req.user._id } },
    { new: true }
  )
    .then((item) => res.status(200).send(item))
    .catch((error) =>
      res.status(500).send({ message: "Internal Server Error", error })
    );
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
