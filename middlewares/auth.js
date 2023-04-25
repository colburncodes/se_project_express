const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../utils/config");
const Unauthorized = require("../utils/errors/unauthorized");

const handleAuthError = () => {
  throw new Unauthorized("Unauthorized");
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    handleAuthError();
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    handleAuthError();
  }

  req.user = payload; // adding the payload to the Request object

  next();
};
