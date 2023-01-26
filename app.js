require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.DOCKER_PORT || 8080;
const timeout = require("connect-timeout");
const cors = require("cors");
const { ERROR_MSGS } = require("./Configs/Constants");
const appRoot = require("app-root-path");

const customerRoutes = require("./Routes/Customer/CustomerRoutes");
const mealpackRoutes = require("./Routes/Mealpack/MealpackRoutes");
const sampleRoutes = require("./Routes/Sample/SampleRoutes");
const storeRoutes = require("./Routes/Store/StoreRoutes");
const userRoutes = require("./Routes/User/UserRoutes");

app.set("view engine", "ejs");
app.set("views", appRoot.resolve("./Views"));
app.use(cors());
app.use(express.json());
app.use(timeout("5s"));

app.use((req, res, next) => {
  if (!req.timedout) next();
});

app.use("/user", userRoutes);
app.use("/customer", customerRoutes);
app.use("/mealpack", mealpackRoutes);
app.use("/sample", sampleRoutes);
app.use("/store", storeRoutes);

// Not found handling
app.use((req, res, next) => {
  res.status(404);
  const error = new Error(ERROR_MSGS.NOT_FOUND);
  next(error);
});
// Errors handling
app.use((error, req, res, next) => {
  res.status(res.statusCode || 500);
  res.json({
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      "Server is Successfully Running and app is listening on port " + PORT
    );
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
