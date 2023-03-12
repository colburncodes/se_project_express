const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { ERROR_CODES } = require("../utils/errors");
const User = require("../models/user");

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      if (user) {
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });
        res.send({ token });
      }
    })
    .catch((err) => {
      res.status(ERROR_CODES.Unauthorized).send({ message: err.message });
    });
};

const getCurrentUser = async (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        res.status(ERROR_CODES.NotFound).send({ message: "User not found" });
      }
      res.status(ERROR_CODES.Ok).send(user);
    })
    .catch((error) => {
      if (error.name === "CastError") {
        res
          .status(ERROR_CODES.NotFound)
          .send({ message: "User with Id not found!" });
      } else {
        next(error);
      }
    });
};

const createUser = async (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({ name, email, password: hash, avatar }).then((user) => {
        res.status(ERROR_CODES.Created).send({
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        });
      })
    )
    .catch((error) => {
      if (error.name === "ValidationError") {
        res.status(ERROR_CODES.BadRequest).send({ message: "Invalid data" });
      } else if (error.code === ERROR_CODES.DuplicateError) {
        res
          .status(ERROR_CODES.Conflict)
          .send({ message: "User already exists! " });
      }
      next(error);
    });
};

const updateUser = (req, res) => {
  const { userId } = req.user._id;
  const { name, avatar, about } = req.body;

  User.findByIdAndUpdate(
    userId,
    { $set: { name, avatar, about } },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        res.status(ERROR_CODES.NotFound).send({ message: "User not found" });
      }
      res.send({ data: user });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        res.status(ERROR_CODES.BadRequest).send({ message: "Invalid Data" });
      } else {
        res
          .status(ERROR_CODES.ServerError)
          .send({ message: "Error updating user", error });
      }
    });
};

module.exports = {
  login,
  getCurrentUser,
  createUser,
  updateUser,
};
