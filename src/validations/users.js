const Joi = require("joi");

const createUserSchema = Joi.object().keys({
  name: Joi.string().required().min(3).max(30),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
});

const loginUserSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
});

const createPasswordResetTokenSchema = Joi.object().keys({
  email: Joi.string().email().required(),
});

const passwordResetSchema = Joi.object().keys({
  password: Joi.string().required().min(8),
  token: Joi.string().required(),
});

const updateUserSchema = Joi.object().keys({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  password: Joi.string().min(8),
});

module.exports = {
  createUserSchema,
  loginUserSchema,
  createPasswordResetTokenSchema,
  passwordResetSchema,
  updateUserSchema,
};
