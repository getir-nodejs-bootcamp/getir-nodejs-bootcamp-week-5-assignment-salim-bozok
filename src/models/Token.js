const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  scope: {
    type: String,
    enum: ["activation", "password_reset"],
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

mongoose.model("Token", tokenSchema);
