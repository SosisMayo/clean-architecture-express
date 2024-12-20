// src/domain/usecases/user/createUser.js
const bcrypt = require("bcryptjs");
const User = require("../../entities/User");
const userRepository = require("../../../infrastructure/repositories/userRepositoryImpl");

const create = async (userData) => {
  // Cek Username
  const existingUser = await userRepository.findByUsername(userData.username);
  if (existingUser) throw new Error("Username already in use");

  // Hashing Password
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  let existingAccount;

  // Bikin Account Number
  do {
    userData.account_number = Math.random() * 1000000000;
    existingAccount = await userRepository.findByAccountNumber(
      userData.account_number.toString()
    );
  } while (existingAccount);

  // Asign Avatar URL Default Ketika Gak Diinput
  if (!userData.avatar_url) {
    userData.avatar_url =
      "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";
  }

  const newUser = new User(
    null,
    userData.full_name,
    userData.username,
    userData.email,
    hashedPassword,
    userData.account_number,
    0,
    userData.phone_number,
    userData.avatar_url,
    userData.role
  );

  // Create User
  const createdUser = await userRepository.create(newUser);

  return { user: createdUser };
};

module.exports = { create };
