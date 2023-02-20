const express = require("express");
const mongoose = require("mongoose");
const app = express();

const { PORT = 3001 } = process.env;
const {
  handle400Errors,
  handle404Errors,
  handle500Errors,
} = require("./utils/errors");

// DB Connection
mongoose.connect("mongodb://localhost:27017/wtwr_db");

// Routes
const routes = require("./routes/index");

app.use(express.json());
app.use(routes);

app.use((req, res, next) => {
  req.user = {
    _id: "63f37898e4813050d4d5d3a3",
  };
  next();
});

// Error Handling
app.use(handle400Errors);
app.use(handle404Errors);
app.use(handle500Errors);

app.listen(PORT, () => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 3001
    📭  Query at http://localhost:3001
  `);
});
