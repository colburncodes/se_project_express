// middleware/validation.js

const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const createClothingValidation = celebrate({
  body: Joi.object({
    name: Joi.string().required().min(2).max(30),
    imageUrl: Joi.string().uri().required(),
  }),
});

const createUserValidation = celebrate({
  body: Joi.object({
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string().uri().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string().required(),
  }),
});

const createAuthValidation = celebrate({
  body: Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required()
      .min(8),
  }),
});

module.exports = {
  createClothingValidation,
  createUserValidation,
  createAuthValidation,
};
