const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .orFail()
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((error) =>
      res.status(500).send({ message: "Error making request", error })
    );
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((error) =>
      res.status(404).send({ message: "User does not exist", error })
    );
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .orFail()
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch(() =>
      res.status(500).send({ message: "Error creating user", error })
    );
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name, avatar, about } = req.body;

  User.findByIdAndUpdate(userId, { $set: { name, avatar, about } })
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((error) =>
      res.status(500).send({ message: "Error updating user", error })
    );
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
};
