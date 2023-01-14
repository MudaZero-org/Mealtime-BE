const { ERROR_MSGS } = require("../../Configs/Constants");

const StoreController = {
  helloWorld: async (req, res) => {
    try {
      res.status(200).json({ message: "Hello world from store" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
};

module.exports = StoreController;
