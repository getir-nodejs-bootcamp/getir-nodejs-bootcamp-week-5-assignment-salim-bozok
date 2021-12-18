const { createProduct, getProduct } = require("../services/products");

const createProductController = async (req, res) => {
  try {
    const product = await createProduct(req.data);
    res.status(201).json({ product });
  } catch (error) {
    console.log("an error occured while creating product", error);
    res.status(500).json({ error });
  }
};

const getProductController = async (req, res) => {
  try {
    const product = await getProduct(req.params.id);

    if (!product) {
      res.status(404).json({ error: "product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.log("an error occured while getting product", error);
    res.status(500).json({ error });
  }
};

const updateProductController = async (req, res) => {};

const updateProductImageController = async (req, res) => {
  try {
    const product = await getProduct(req.params.id);

    if (!product) {
      res.status(404).json({ error: "product not found" });
    }

    // TODO: update product image
  } catch (error) {
    console.log("an error occured while getting product", error);
    res.status(500).json({ error });
  }
};

const getProductsController = async (req, res) => {
  try {
    const products = await getProducts(req.data);

    res.status(200).json({ products });
  } catch (error) {
    console.log("an error occured while getting products", error);
    res.status(500).json({ error });
  }
};

module.exports = {
  createProductController,
  getProductController,
  updateProductController,
  updateProductImageController,
  getProductsController,
};
