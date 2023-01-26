//Talks to the DB

const knex = require("../../db/knex");

const UserModel = {
  getAllUsers() {
    return knex
      .select({
        storeId: "id",
        storeName: "store_name",
        companyName: "company_name",
        postalCode: "postal_code",
        storeAddress: "store_address",
        phoneNumber: "phone_number",
        email: "email",
        storeManager: "store_manager",
        password: "password",
      })
      .from("stores")
      .limit(100);
  },
  getUserByEmail(userEmail) {
    return knex
      .select({
        storeId: "id",
        storeName: "store_name",
        email: "email",
        password: "password",
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
      .returning({
        storeId: "id",
        storeName: "store_name",
        companyName: "company_name",
        storeAddress: "store_address",
        email: "email",
        postalCode: "postal_code",
        phoneNumber: "phone_number",
        storeManager: "store_manager",
        profileImg: "profile_img",
      });
  },
  getUserById(storeId) {
    return knex
      .select({
        storeId: "id",
        storeName: "store_name",
        companyName: "company_name",
        postalCode: "postal_code",
        storeAddress: "store_address",
        phoneNumber: "phone_number",
        email: "email",
        storeManager: "store_manager",
        profileImg: "profile_img",
      })
      .from("stores")
      .where({ id: storeId });
  },
  updateUser(storeId, updateData) {
    const {
      storeName,
      postalCode,
      companyName,
      storeAddress,
      phoneNumber,
      storeManager,
      profileImg,
    } = updateData;

    return knex("stores")
      .update({
        store_name: storeName,
        postal_code: postalCode,
        company_name: companyName,
        store_address: storeAddress,
        phone_number: phoneNumber,
        store_manager: storeManager,
        profile_img: profileImg,
      })
      .where({ id: storeId })
      .returning({
        storeId: "id",
        storeName: "store_name",
        companyName: "company_name",
        storeAddress: "store_address",
        email: "email",
        postalCode: "postal_code",
        phoneNumber: "phone_number",
        storeManager: "store_manager",
        profileImg: "profile_img",
      });
  },
};
module.exports = UserModel;
