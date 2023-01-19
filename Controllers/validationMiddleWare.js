const { ERROR_MSGS, REGEXES } = require("../Configs/Constants");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("./model/UserModel");

const validateSignUp = async (req, res, next) => {
  const { email } = req.body;
  const errorMessage = [];

  // check for neccesary input prevent crash
  if (!email) {
    errorMessage.push(ERROR_MSGS.INVALID_INPUT);
    res.status(400).json({
      message: ERROR_MSGS.VALIDATION_ERROR,
      error: JSON.stringify(errorMessage),
    });
    return;
  }

  const isEmailValid = email.match(REGEXES.EMAIL);
  if (!isEmailValid) {
    errorMessage.push(ERROR_MSGS.INVALID_EMAIL);
  }
  const data = await userModel.getUserEmailPass(email);
  if (data.length > 0) {
    errorMessage.push(ERROR_MSGS.EMAIL_IN_USE);
  }

  if (errorMessage.length > 0) {
    res.status(400).json({
      message: ERROR_MSGS.VALIDATION_ERROR,
      error: JSON.stringify(errorMessage),
    });
    return;
  } else {
    next();
    return;
  }
};
const validateLogin = async (req, res, next) => {
  const { userEmail, userPassword } = req.body;
  const errorMessage = [];
  if (!(userEmail || userPassword)) {
    errorMessage.push(ERROR_MSGS.INVALID_INPUT);
    res.status(400).json({
      message: ERROR_MSGS.VALIDATION_ERROR,
      error: JSON.stringify(errorMessage),
    });
    return;
  }
  const [userInfo] = await userModel.getUserEmailPass(userEmail);
  if (!userInfo) {
    errorMessage.push(ERROR_MSGS.NOT_FOUND);
  }
  const isPasswordMatched = await bcrypt.compare(
    userPassword,
    userInfo.password
  );
  if (!isPasswordMatched) {
    errorMessage.push(ERROR_MSGS.UNAUTHORIZED);
  }

  if (errorMessage.length > 0) {
    res.status(400).json({
      message: ERROR_MSGS.VALIDATION_ERROR,
      error: JSON.stringify(errorMessage),
    });
    return;
  } else {
    next();
    return;
  }
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(401).json({ error: ERROR_MSGS.UNAUTHORIZED });
    return;
  }
  if (authHeader.split(" ")[0] !== "Bearer") {
    res.status(401).json({ error: ERROR_MSGS.UNAUTHORIZED });
    return;
  }

  try {
    const token = jwt.verify(
      authHeader.split(" ")[1],
      process.env.SECRET_KEY || "my_secret"
    );
    if (Date.now() > token.exp * 1000) {
      res.status(401).json({ error: ERROR_MSGS.UNAUTHORIZED });
      return;
    }
    console.log(token);
    next();
    return;
  } catch (e) {
    console.log(e.message);
    res.status(401).json({ error: e.message });
  }
};

module.exports = { validateSignUp, validateLogin, verifyToken };
