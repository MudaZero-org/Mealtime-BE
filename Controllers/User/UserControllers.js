const { ERROR_MSGS } = require("../../Configs/Constants");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//const userModel = require("/path")

const CustomerController = {
	helloWorld: async (req, res) => {
		try {
			res.status(200).json({ message: "Hello world from Cus" });
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
			return user.userEmail === userEmail;
		});

		//If no user found
		if (!user) {
			res.status(400).send({
				error: "User not found!",
			});
		} else {
			let isMatch = await bcrypt.compare(userPassword, user.Password);

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

				res.send({
					accessToken,
					refreshToken,
				});
			} else {
				console.log("Wrong credentials");
			}
		}
      
    } catch(error) {
      console.log(error)
    }
		
	},

	signUp: async (req, res) => {
		let allUsers = [];

		await userModel.getAllUsers().then((data) => {
			return (allUsers = data);
		});

		let user = allUsers.find((user) => {
			return user.userEmail == req.body.userEmail;
		});

		if (user) {
			res.status(200).send({
				email: user.userEmail,
				message: "This email is already used.",
			});
		} else {
			let bcrpytPassword = bcrypt.hashSync(req.body.userPassword, 10);
      req.body.
		}

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

		// console.log(
		// 	storeName,
		// 	companyName,
		// 	postalCode,
		// 	address,
		// 	phoneNumber,
		// 	email,
		// 	storeManager,
		// 	password
		// );
	},
};

module.exports = CustomerController;
