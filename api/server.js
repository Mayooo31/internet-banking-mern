const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("./app");

// ------------------------------------------------

dotenv.config({ path: "./config.env" });

// Mongo url and mongo options
const DB = process.env.DATABASE;
const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose
  .connect(DB, mongooseOptions)
  .then(() => console.log("DB connection successful! 👍"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}... 👍`);
});
