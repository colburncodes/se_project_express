require("dotenv").config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || "super-duper-secret-key",
};
