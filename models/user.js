const mongoose = require("mongoose");
const validator = require("validator");
const isEmail = require("validator/lib/isEmail");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: "Elise",
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (e) => isEmail(e),
      message: "Email is invalid format",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Elise.png",
  },
});

module.exports = mongoose.model("user", userSchema);
