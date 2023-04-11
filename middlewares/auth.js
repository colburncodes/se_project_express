const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;
const { STATUS_CODES } = require("../utils/errors");

const handleAuthError = (res) => {
  res
    .status(STATUS_CODES.Unauthorized)
    .send({ message: "Authorization Error" });
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    handleAuthError(res);
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    handleAuthError(res);
  }

  req.user = payload; // adding the payload to the Request object

  next();
};
