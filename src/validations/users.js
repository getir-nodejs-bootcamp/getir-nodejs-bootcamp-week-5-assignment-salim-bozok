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

module.exports = {
  createUserSchema,
  loginUserSchema,
};
