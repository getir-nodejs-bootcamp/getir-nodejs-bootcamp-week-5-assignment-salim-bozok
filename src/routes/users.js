const express = require("express");
const {
  createUserController,
  loginUserController,
  getUserController,
  updateUserController,
} = require("../controllers/users");
const validate = require("../middlewares/validate");
const { createUserSchema, loginUserSchema } = require("../validations/users");

const router = express.Router();

router.post("/", validate(createUserSchema, "body"), createUserController);
router.post("/login", validate(loginUserSchema, "body"), loginUserController);
router.get("/me", getUserController);
router.patch("/", updateUserController);

module.exports = router;
