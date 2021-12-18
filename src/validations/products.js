const Joi = require("joi");

const createProductSchema = Joi.object().keys({
  name: Joi.string().required().min(3).max(50),
  description: Joi.string().required().min(3).max(1000),
  price: Joi.number().required().greater(0),
});

const updateProductSchema = Joi.object().keys({
  name: Joi.string().min(3).max(50),
  description: Joi.string().min(3).max(1000),
  price: Joi.number().greater(0),
});

const getProductsSchema = Joi.object().keys({
  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).max(100).default(10),
  sort: Joi.string().valid(["name", "price", "updatedAt"]).default("updatedAt"),
  order: Joi.string().valid(["asc", "desc"]).default("asc"),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductsSchema,
};
