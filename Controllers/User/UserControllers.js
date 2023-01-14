const { ERROR_MSGS } = require("../../Configs/Constants");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userModel = require("../model/UserModel");

const CustomerController = {
	helloWorld: async (req, res) => {
		try {
			res.status(200).json({ message: "Hello world from User" });
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
		}
	},

	logIn: async (req, res) => {
		try {
			const { userEmail, userPassword } = req.body;
			let allUsers = [];
			let refreshTokens = [];

			await userModel.getAllUsers().then((data) => {
				return (allUsers = data);
			});

			let user = allUsers.find((user) => {
				return user.email === userEmail;
			});

			//If no user found
			if (!user) {
				res.status(400).send({
					email: "The email you entered isn’t connected to an account",
				});
			} else {
				//Checks if passwords match
				let isMatch = await bcrypt.compare(userPassword, user.password);

				if (isMatch) {
					const accessToken = await jwt.sign(
						{ userEmail },
						process.env.SECRET_KEY,
						{
							algorithm: "HS256",
							expiresIn: "1h",
						}
					);

					const refreshToken = await jwt.sign(
						{ userEmail },
						process.env.SECRET_KEY,
						{
							algorithm: "HS256",
							expiresIn: "5m",
						}
					);

					refreshTokens.push(refreshToken);

					if (accessToken) {
						const secret = process.env.SECRET_KEY;
						await jwt.verify(accessToken, secret, (err, decoded) => {
							if (!err) {
								req.userEmail = decoded.userEmail;
								let userData = userModel
									.getUserByEmail(userEmail)
									.then((userData) => {
										res.send({
											userData,
											accessToken,
											refreshToken,
										});
									});
							} else {
								res.status(403).send({
									error: "Invalid token",
								});
							}
						});
					} else {
						res.status(404).send({
							error: "Token not found",
						});
					}
				} else {
					res.status(400).send({
						error: "Email and password does not match.",
					});
				}
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
		}
	},

	signUp: async (req, res) => {
		try {
			let allUsers = [];
			let refreshTokens = [];

			await userModel.getAllUsers().then((data) => {
				return (allUsers = data);
			});

			let user = allUsers.find((user) => {
				return user.email == req.body.email;
			});

			if (user) {
				res.status(400).send({
					message: "This email address is already taken",
				});
			} else {
				let bcryptPassword = bcrypt.hashSync(req.body.password, 10);
				req.body.password = bcryptPassword;

				await userModel.saveUserData(req.body).then((data) => {
					const { userEmail } = req.body;
					const accessToken = jwt.sign({ userEmail }, process.env.SECRET_KEY, {
						algorithm: "HS256",
						expiresIn: "1h",
					});
					const refreshToken = jwt.sign(
						{ userEmail: req.body.email },
						process.env.SECRET_KEY,
						{
							algorithm: "HS256",
							expiresIn: "5m",
						}
					);

					if (accessToken) {
						const secret = process.env.SECRET_KEY;
						jwt.verify(accessToken, secret, (err, decoded) => {
							if (!err) {
								req.userEmail = decoded.userEmail;
								let userData = userModel
									.getUserByEmail(req.body.email)
									.then((userData) => {
										res.send({
											userData,
											accessToken,
											refreshToken,
										});
									});
							} else {
								res.status(403).send({
									error: "Invalid token",
								});
							}
						});
					} else {
						res.status(400).send({
							error: "Token not found",
						});
					}
				});
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
		}
	},
};

module.exports = CustomerController;
