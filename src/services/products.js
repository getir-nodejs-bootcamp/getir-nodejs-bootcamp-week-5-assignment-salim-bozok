const mongoose = require("mongoose");

const Product = mongoose.model("Product");

async function createProduct(data) {
  const product = new Product(data);
  await product.save();
  return product;
}

async function getAllProducts(data) {
  return await Product.find()
    .limit(data.limit)
    .skip((data.page - 1) * data.limit);
}

async function getProduct(id) {
  return await Product.findById(id);
}

async function updateProduct(id, data) {
  return await Product.findByIdAndUpdate(id, data, { new: true });
}

async function deleteProduct(id) {
  return await Product.findByIdAndDelete(id);
}

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
