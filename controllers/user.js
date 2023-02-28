const { ERROR_CODES } = require("../utils/errors");
const User = require("../models/user");

const getUsers = (req, res, next) => {
  User.find({})
    .then((user) => {
      res.send({ users: user });
    })
    .catch((error) => {
      next(error);
    });
};

const getUser = async (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(ERROR_CODES.NotFound).send({ message: "User nout found" });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(ERROR_CODES.BadRequest).send({ message: "Invalid user id" });
      }
      if (err.name === "DocumentNotFoundError") {
        res.status(ERROR_CODES.NotFound).send({ message: "User not found" });
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        res.status(ERROR_CODES.BadRequest).send({ message: "Invalid data" });
      }
      next(error);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
