//Talks to the DB

const knex = require("../../db/knex");

const UserModel = {};

module.exports = UserModel;

module.exports = {
  getAllUsers() {
    return knex
      .select({
        userId: "id",
        storeName: "store_name",
        companyName: "company_name",
        postalCode: "postal_code",
        storeAddress: "store_address",
        phoneNumber: "phone_number",
        email: "email",
        storeManager: "store_manager",
        password: "password",
      })
      .from("stores");
  },
  getUserEmailPass(userEmail) {
    return knex
      .select({
        userId: "id",
        email: "email",
        password: "password",
      })
      .from("stores")
      .where("email", "=", userEmail);
  },

  getUserByEmail(userEmail) {
    return knex
      .select({
        userId: "id",
        storeName: "store_name",
        email: "email",
      })
      .from("stores")
      .where("email", "=", userEmail);
  },

  postUser(data) {
    const { storeName, email, hashedPassword } = data;
    return knex("stores")
      .insert({
        store_name: storeName,
        email: email,
        password: hashedPassword,
      })
      .returning(["id", "store_name", "email"]);
  },
};
