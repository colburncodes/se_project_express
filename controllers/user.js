const User = require("../models/user");

const getUsers = (req, res, next) => {
  User.find({})
    .orFail()
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((error) => {
      next(error);
    });
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(404).send({
      message: error.message,
    });
  }

  User.findById({ userId })
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      if (error.name === "CastError") {
        res.status(400).send({ message: error.message });
      }
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .orFail()
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((error) => {
      next(error);
    });
};

const updateUser = (req, res, next) => {
  const { userId } = req.params;
  const { name, avatar, about } = req.body;

  User.findByIdAndUpdate(userId, { $set: { name, avatar, about } })
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
};
