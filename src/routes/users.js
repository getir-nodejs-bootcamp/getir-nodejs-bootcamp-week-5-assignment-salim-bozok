const express = require("express");

const {
  createUserController,
  loginUserController,
  getUserController,
  updateUserController,
  passwordResetTokenController,
  resetPasswordController,
} = require("../controllers/users");
const validate = require("../middlewares/validate");
const auth = require("../middlewares/auth");
const { createUserSchema, loginUserSchema } = require("../validations/users");

const router = express.Router();

router.post("/", validate(createUserSchema, "body"), createUserController);
router.post("/login", validate(loginUserSchema, "body"), loginUserController);
router.get("/me", auth, getUserController);
router.patch("/", auth, updateUserController);

// create password reset token and send as email
router.post("password-reset", passwordResetTokenController);
// reset password using password reset token
router.put("password", resetPasswordController);

module.exports = router;
