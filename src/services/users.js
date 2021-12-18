const mongoose = require("mongoose");

const User = mongoose.model("User");

async function createUser(data) {
  const user = new User(data);
  await user.save();
  return user;
}

async function getUser(id) {
  return await User.findById(id);
}

async function getUserByEmail(email) {
  return await User.findOne({ email });
}

async function getUsers() {
  return await User.find();
}

async function updateUser(id, data) {
  await User.findByIdAndUpdate(id, data);
}

async function deleteUser(id) {
  await User.findByIdAndDelete(id);
}

module.exports = {
  createUser,
  getUser,
  getUserByEmail,
  getUsers,
  updateUser,
  deleteUser,
};
