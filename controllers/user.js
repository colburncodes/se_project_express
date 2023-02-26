const User = require("../models/user");

const getUsers = (req, res, next) => {
  User.find({})
    .orFail()
    .then((user) => {
      res.status(200).send({ users: user });
    })
    .catch((error) => {
      next(error);
    });
};

const getUser = async (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "User nout found" });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Invalid user id" });
      }
      if (err.name === "DocumentNotFoundError") {
        res.status(404).send({ message: "User not found" });
      } else {
        next(err);
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
  getUser,
  createUser,
  updateUser,
};
