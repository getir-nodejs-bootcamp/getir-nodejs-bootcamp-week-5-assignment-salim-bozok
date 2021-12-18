const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function comparePassword(hashedPassword, password) {
  return bcrypt.compareSync(password, hashedPassword);
}

function generateAuthToken(user) {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
}

module.exports = {
  comparePassword,
  generateAuthToken,
};
