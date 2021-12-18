const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    // If the price of the products goes down
    // system will send an email to the user
    followedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

// Hash the password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 12);
      user.password = hashedPassword;
      next();
    } catch (error) {
      console.log("an error occured while hashing password", error);
      next(error);
    }
  } else {
    next();
  }
});

mongoose.model("User", userSchema);
