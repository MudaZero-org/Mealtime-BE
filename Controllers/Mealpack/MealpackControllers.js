const { ERROR_MSGS } = require("../../Configs/Constants");

const MealpackController = {
  helloWorld: async (req, res) => {
    try {
      res.status(200).json({ message: "Hello world from MP" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
};

module.exports = MealpackController;