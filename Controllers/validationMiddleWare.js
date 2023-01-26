const { ERROR_MSGS, REGEXES } = require("../Configs/Constants");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("./model/UserModel");

const validateSignUp = async (req, res, next) => {
  const { email, storeName, password } = req.body;
  const errorMessage = [];

  if (!(email && storeName && password)) {
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
  const data = await userModel.getUserByEmail(email);
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
  if (!(userEmail && userPassword)) {
    errorMessage.push(ERROR_MSGS.INVALID_INPUT);
    res.status(400).json({
      message: ERROR_MSGS.VALIDATION_ERROR,
      error: JSON.stringify(errorMessage),
    });
    return;
  }
  const [userInfo] = await userModel.getUserByEmail(userEmail);
  console.log(userInfo);
  if (!userInfo) {
    errorMessage.push(ERROR_MSGS.NOT_FOUND);
    res.status(400).json({
      message: ERROR_MSGS.VALIDATION_ERROR,
      error: JSON.stringify(errorMessage),
    });
    return;
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

const validateGetRecipeByIngredients = async (req, res, next) => {
  const { ingredients, filteredWords } = req.body;
  const errorMessage = [];
  if (!(ingredients && filteredWords)) {
    errorMessage.push(ERROR_MSGS.INVALID_INPUT);
    res.status(400).json({
      message: ERROR_MSGS.VALIDATION_ERROR,
      error: JSON.stringify(errorMessage),
    });
    return;
  }

  if (ingredients.length < 1) {
    errorMessage.push(ERROR_MSGS.INVALID_INPUT);
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

const validatePostMealPack = async (req, res, next) => {
  const { data } = req.body;
  let { store_id: storeId } = req.params;
  const errorMessage = [];

  if (!(data !== undefined && storeId !== undefined)) {
    errorMessage.push(ERROR_MSGS.INVALID_INPUT);
    res.status(400).json({
      message: ERROR_MSGS.VALIDATION_ERROR,
      error: JSON.stringify(errorMessage),
    });
    return;
  }

  storeId = Number(storeId);
  if (!storeId) {
    errorMessage.push(ERROR_MSGS.INVALID_INPUT);
    res.status(400).json({
      message: ERROR_MSGS.VALIDATION_ERROR,
      error: JSON.stringify(errorMessage),
    });
    return;
  }

  const [isStoreExist] = await userModel.getUserById(storeId);
  if (!isStoreExist) {
    errorMessage.push(ERROR_MSGS.NOT_FOUND);
  }
  if (data.length < 1) {
    errorMessage.push(ERROR_MSGS.INVALID_INPUT);
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

const validatePutMealPack = async (req, res, next) => {
  const { mealpackName, isPublishing, isDelete } = req.body;
  let { store_id: storeId, mealpack_id: mealpackId } = req.params;
  const errorMessage = [];

  if (
    !(
      storeId !== undefined &&
      mealpackId !== undefined &&
      mealpackName !== undefined &&
      isPublishing !== undefined &&
      isDelete !== undefined
    )
  ) {
    errorMessage.push(ERROR_MSGS.INVALID_INPUT);
    res.status(400).json({
      message: ERROR_MSGS.VALIDATION_ERROR,
      error: JSON.stringify(errorMessage),
    });
    return;
  }

  storeId = Number(storeId);
  mealpackId = Number(mealpackId);
  if (!(storeId && mealpackId)) {
    errorMessage.push(ERROR_MSGS.INVALID_INPUT);
    res.status(400).json({
      message: ERROR_MSGS.VALIDATION_ERROR,
      error: JSON.stringify(errorMessage),
    });
    return;
  }

  if (typeof mealpackName !== "string") {
    errorMessage.push(ERROR_MSGS.INVALID_INPUT);
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

const validatePutUser = async (req, res, next) => {
  let { store_id: storeId } = req.params;
  const {
    storeName,
    postalCode,
    companyName,
    storeAddress,
    phoneNumber,
    storeManager,
    profileImg,
  } = req.body;
  const errorMessage = [];
  if (
    !(
      storeId !== undefined &&
      storeName !== undefined &&
      postalCode !== undefined &&
      companyName !== undefined &&
      storeAddress !== undefined &&
      phoneNumber !== undefined &&
      storeManager !== undefined &&
      profileImg !== undefined
    )
  ) {
    errorMessage.push(ERROR_MSGS.INVALID_INPUT);
    res.status(400).json({
      message: ERROR_MSGS.VALIDATION_ERROR,
      error: JSON.stringify(errorMessage),
    });
    return;
  }

  storeId = Number(storeId);
  if (!storeId) {
    errorMessage.push(ERROR_MSGS.INVALID_INPUT);
    res.status(400).json({
      message: ERROR_MSGS.VALIDATION_ERROR,
      error: JSON.stringify(errorMessage),
    });
    return;
  }

  const [isStoreExist] = await userModel.getUserById(storeId);
  if (!isStoreExist) {
    errorMessage.push(ERROR_MSGS.NOT_FOUND);
  }

  if (typeof storeName !== "string") {
    errorMessage.push(ERROR_MSGS.INVALID_INPUT);
  }

  const isPostalCodeValid = Number(postalCode);
  if (postalCode !== null && !isPostalCodeValid) {
    errorMessage.push(ERROR_MSGS.INVALID_INPUT);
  }

  const isPhoneNumberValid = Number(phoneNumber);
  if (postalCode !== null && !isPhoneNumberValid) {
    errorMessage.push(ERROR_MSGS.INVALID_INPUT);
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

module.exports = {
  validateSignUp,
  validateLogin,
  verifyToken,
  validateGetRecipeByIngredients,
  validatePostMealPack,
  validatePutMealPack,
  validatePutUser,
};
