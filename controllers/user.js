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
        // sign token
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

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({ name, email, password: hash, avatar }).then((user) => {
        res.status(200).send({ data: user });
      })
    )
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
  login,
  getUsers,
  getUser,
  createUser,
};
