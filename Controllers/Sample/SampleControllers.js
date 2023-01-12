const { ERROR_MSGS } = require("../../Configs/Constants");

const SampleController = {
  helloWorld: async (req, res) => {
    try {
      res.status(200).json({ message: "Hello world from sample" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
};

module.exports = SampleController;
