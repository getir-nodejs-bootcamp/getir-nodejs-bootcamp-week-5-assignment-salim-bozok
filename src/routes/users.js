const express = require("express");

const {
  createUserController,
  loginUserController,
  getUserController,
  updateUserController,
} = require("../controllers/users");
const validate = require("../middlewares/validate");
const auth = require("../middlewares/auth");
const { createUserSchema, loginUserSchema } = require("../validations/users");

const router = express.Router();

router.post("/", validate(createUserSchema, "body"), createUserController);
router.post("/login", validate(loginUserSchema, "body"), loginUserController);
router.get("/me", auth, getUserController);
router.patch("/", auth, updateUserController);

module.exports = router;
