const knex = require("../../db/knex");

const FilterListModel = {
  getFilterListByStoreId: (storeId) => {
    return knex("filter_lists")
      .select({
        filterId: "id",
        filterName: "filter_name",
        filteredIngredients: "filtered_ingredients",
        isDelete: "is_delete",
        storeId: "store_id",
      })
      .where({ store_id: storeId, is_delete: false });
  },
  createFilterList: (data) => {
    const { filterName, filteredIngredients, storeId } = data;
    return knex("filter_lists")
      .insert({
        filter_name: filterName,
        filtered_ingredients: filteredIngredients,
        is_delete: false,
        store_id: storeId,
      })
      .returning({
        filterId: "id",
        filterName: "filter_name",
        filteredIngredients: "filtered_ingredients",
        isDelete: "is_delete",
        storeId: "store_id",
      });
  },
};

module.exports = FilterListModel;
