const { ERROR_MSGS } = require("../../Configs/Constants");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userModel = require("../model/UserModel");

const UserController = {
  logIn: async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body;
      console.log(userEmail, userPassword);

      const accessToken = await jwt.sign(
        { userEmail },
        process.env.SECRET_KEY,
        {
          algorithm: "HS256",
          expiresIn: "1h",
        }
      );

      if (!accessToken) {
        res.status(404).json({
          message: ERROR_MSGS.INTERNAL_SERVER_ERROR,
        });
        return;
      }

      const refreshToken = await jwt.sign(
        { userEmail },
        process.env.SECRET_KEY,
        {
          algorithm: "HS256",
          expiresIn: "5m",
        }
      );

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
      const { storeName, email, password } = req.body;
      console.log(storeName, email, password);

      const hashedPassword = await bcrypt.hashSync(password, 10);
      const [data] = await userModel.postUser({
        storeName,
        email,
        hashedPassword,
      });

      const accessToken = await jwt.sign({ email }, process.env.SECRET_KEY, {
        algorithm: "HS256",
        expiresIn: "1h",
      });

      if (!accessToken) {
        res.status(500).json({
          message: ERROR_MSGS.INTERNAL_SERVER_ERROR,
        });
        return;
      }

      const refreshToken = await jwt.sign({ email }, process.env.SECRET_KEY, {
        algorithm: "HS256",
        expiresIn: "5m",
      });

      console.log(data, accessToken, refreshToken);
      res.status(200).json({ data, accessToken, refreshToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
  refreshToken: async (req, res) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      res.status(401).json({ error: ERROR_MSGS.UNAUTHORIZED });
      return;
    }

    const [authHeaderBearer, secret] = authHeader.split(" ");
    if (!(authHeaderBearer || secret)) {
      res.status(400).json({ error: ERROR_MSGS.INVALID_INPUT });
      return;
    }

    if (authHeaderBearer !== "Bearer") {
      res.status(401).json({ error: ERROR_MSGS.UNAUTHORIZED });
      return;
    }

    try {
      const token = jwt.verify(secret, process.env.SECRET_KEY || "my_secret");
      if (Date.now() > token.exp * 1000) {
        res.status(401).json({ error: ERROR_MSGS.UNAUTHORIZED });
        return;
      }
      console.log(token);
      const { userEmail: email } = token;
      const accessToken = await jwt.sign({ email }, process.env.SECRET_KEY, {
        algorithm: "HS256",
        expiresIn: "1h",
      });
      console.log(accessToken);
      res.status(200).json({ accessToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
  getStoreById: async (req, res) => {
    try {
      const { store_id: storeId } = req.params;
      console.log(storeId);
      const [data] = await userModel.getUserById(storeId);
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
  updateStore: async (req, res) => {
    try {
      const { store_id: storeId } = req.params;
      const {
        storeName,
        postalCode,
        companyName,
        storeAddress,
        phoneNumber,
        storeManager,
        profileImg,
      } = req.body;

      console.log(
        storeId,
        storeName,
        postalCode,
        companyName,
        storeAddress,
        phoneNumber,
        storeManager,
        profileImg
      );
      const updateData = {
        storeName,
        postalCode,
        companyName,
        storeAddress,
        phoneNumber,
        storeManager,
        profileImg,
      };

      const [data] = await userModel.updateUser(storeId, updateData);
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
};

module.exports = UserController;
