const { ERROR_MSGS, REGEXES } = require("../Configs/Constants");
require("dotenv").config();
const bcrypt = require("bcrypt");
const userModel = require("./model/UserModel");

const validateSignUp = async (req, res, next) => {
  const { email } = req.body;
  const errorMessage = [];
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
module.exports = { validateSignUp, validateLogin };
