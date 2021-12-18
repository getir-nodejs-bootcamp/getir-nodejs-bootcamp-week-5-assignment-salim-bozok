const crypto = require("crypto");
const mongoose = require("mongoose");

const Token = mongoose.model("Token");

// generateToken takes userID, token scope (ex. "activation", "password_reset"),
// expiration time and returns a token
function generateToken(userID, scope, ttl) {
  // create random bytes
  const bytes = crypto.randomBytes(32);

  // create token
  const token = crypto.Hmac("sha256", bytes).digest("base64");

  return new Token({
    userID,
    scope,
    ttl,
    token,
  });
}

async function createToken(data) {
  const token = generateToken(data.userID, data.scope, data.ttl);

  return token.save();
}

async function getToken(token) {
  return Token.findOne({ token });
}

async function deleteAllTokens(userID, scope) {
  return Token.deleteMany({ userID, scope });
}

module.exports = {
  createToken,
  getToken,
  deleteAllTokens,
};
