require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.DOCKER_PORT || 3000;
const timeout = require("connect-timeout");
const cors = require("cors");

const customerRoutes = require("./Routes/Customer/CustomerRoutes");
const mealpackRoutes = require("./Routes/Mealpack/MealpackRoutes");
const sampleRoutes = require("./Routes/Sample/SampleRoutes");
const storeRoutes = require("./Routes/Store/StoreRoutes");

app.use(cors());
app.use(express.json());
app.use(timeout("5s"));

app.use((req, res, next) => {
  if (!req.timedout) next();
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/customer", customerRoutes);
app.use("/mealpack", mealpackRoutes);
app.use("/sample", sampleRoutes);
app.use("/store", storeRoutes);

// Not found handling
app.use((req, res, next) => {
  res.status(404);
  const error = new Error("not found");
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
