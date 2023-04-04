const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { STATUS_CODES } = require("../utils/errors");
const {
  ConflictError,
  NotFoundError,
  Unauthorized,
  BadRequestError,
} = require("../utils/errors");

const User = require("../models/user");

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      if (user) {
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });
        res.send({ email, token });
      }
    })
    .catch(() => {
      next(new Unauthorized("Incorrect email or password"));
    });
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw NotFoundError("No user with matching ID found");
      }
      res.send({
        data: user,
      });
    })
    .catch(next);
};

const createUser = async (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({ name, email, password: hash, avatar }).then((user) => {
        res.status(STATUS_CODES.Created).send({
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        });
      })
    )
    .catch((error) => {
      if (error.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else if (error.code === STATUS_CODES.DuplicateError) {
        next(new ConflictError("User already exist!"));
      }
      next(error);
    });
};

const updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, avatar, about } = req.body;

  User.findByIdAndUpdate(
    userId,
    { $set: { name, avatar, about } },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        throw NotFoundError("No user with matching ID found");
      }
      res.send({ data: user });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        res.status(STATUS_CODES.ServerError).send({ message: "Server Error" });
      }
    });
};

module.exports = {
  login,
  getUser,
  createUser,
  updateUser,
};
