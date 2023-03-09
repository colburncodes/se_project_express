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
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(ERROR_CODES.BadRequest).send({ message: "Invalid user id" });
      } else {
        next(err);
      }
    });
};

const createUser = async (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  User.create({ name, email, password, avatar })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        res.status(ERROR_CODES.BadRequest).send({ message: "Invalid data" });
      } else if (error.code === ERROR_CODES.DuplicateError) {
        res
          .status(ERROR_CODES.DuplicateError)
          .send({ message: "User already exists! " });
      }
      next(error);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
