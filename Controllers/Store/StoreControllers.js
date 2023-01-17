const knex = require("../../db/knex");
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
  getAllMaelpacks: async (req, res) => {
    try {
      let { store_id } = req.params;
      store_id = Number(store_id);
      
      const data = await knex
        .select({
          id: "id",
          name: "name",
          store_id: "store_id",
          recipe_id: "recipe_id",
          is_publishing: "is_publishing",
          is_delete: "is_delete",
        })
        .from("meal_packs")
        .where("store_id", store_id)
      
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },

};

module.exports = StoreController;
