const { ERROR_MSGS } = require("../../Configs/Constants");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = process.env.SECRET_KEY;

const userModel = require("../model/UserModel");

const UserController = {
  logIn: async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body;
      console.log(userEmail, userPassword);
      let refreshTokens = [];

      const accessToken = await jwt.sign({ userEmail }, secret, {
        algorithm: "HS256",
        expiresIn: "1h",
      });

      if (!accessToken) {
        res.status(404).json({
          message: ERROR_MSGS.UNAUTHORIZED,
        });
        return;
      }

      const refreshToken = await jwt.sign({ userEmail }, secret, {
        algorithm: "HS256",
        expiresIn: "5m",
      });

      refreshTokens.push(refreshToken);
      // let verifiedToken = await jwt.verify(
      //   accessToken,
      //   secret,
      //   (err, decoded) => {
      //     if (!err) {
      //       userEmail = decoded.userEmail;
      //     }
      //   }
      // );

      const [data] = await userModel.getUserByEmail(userEmail);
      console.log(data, accessToken, refreshToken);
      res.status(200).json({ data, accessToken, refreshToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
  signUp: async (req, res) => {
    try {
      const {
        storeName,
        companyName,
        postalCode,
        address,
        phoneNumber,
        email,
        storeManager,
        password,
      } = req.body;

      console.log(
        storeName,
        companyName,
        postalCode,
        address,
        phoneNumber,
        email,
        storeManager,
        password
      );

      const hashedPassword = await bcrypt.hashSync(password, 10);

      await userModel.saveUserData({
        storeName,
        companyName,
        postalCode,
        address,
        phoneNumber,
        email,
        storeManager,
        hashedPassword,
      });

      const accessToken = await jwt.sign({ email }, secret, {
        algorithm: "HS256",
        expiresIn: "1h",
      });

      if (!accessToken) {
        res.status(404).json({
          message: ERROR_MSGS.UNAUTHORIZED,
        });
        return;
      }

      const refreshToken = await jwt.sign({ email }, secret, {
        algorithm: "HS256",
        expiresIn: "5m",
      });

      // let verifiedToken = jwt.verify(accessToken, secret, (err, decoded) => {
      //   if (!err) {
      //     console.log(decoded.userEmail);
      //   }
      // });

      const [data] = await userModel.getUserByEmail(email);
      console.log(data, accessToken, refreshToken);
      res.status(200).json({ data, accessToken, refreshToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
};

module.exports = UserController;
