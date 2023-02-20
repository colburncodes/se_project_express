/* eslint-disable no-console */
const ClothingItem = require("../models/clothingItem");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((error) => {
      res.status(500).send({ message: "Error creating item", error });
    });
};

module.exports = {
  createItem,
};
