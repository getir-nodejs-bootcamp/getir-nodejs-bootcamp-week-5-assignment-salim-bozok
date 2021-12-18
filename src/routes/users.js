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
const {
  createUserSchema,
  loginUserSchema,
  createPasswordResetTokenSchema,
  passwordResetSchema,
  updateUserSchema,
} = require("../validations/users");

const router = express.Router();

router.post("/", validate(createUserSchema, "body"), createUserController);
router.post("/login", validate(loginUserSchema, "body"), loginUserController);
router.get("/me", auth, getUserController);
router.patch(
  "/",
  auth,
  validate(updateUserSchema, "body"),
  updateUserController
);

// create password reset token and send as email
router.post(
  "/password-reset",
  validate(createPasswordResetTokenSchema, "body"),
  passwordResetTokenController
);
// reset password using password reset token
router.put(
  "/password",
  validate(passwordResetSchema, "body"),
  resetPasswordController
);

module.exports = router;
