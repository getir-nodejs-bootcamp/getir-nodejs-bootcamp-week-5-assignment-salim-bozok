const fs = require("fs");
const sharp = require("sharp");
const {
  createProduct,
  getProduct,
  updateProduct,
  getAllProducts,
} = require("../services/products");

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

const updateProductController = async (req, res) => {
  try {
    const product = await updateProduct(req.params.id, req.data);

    if (!product) {
      res.status(404).json({ error: "product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.log("an error occured while updating product", error);
    res.status(500).json({ error });
  }
};

const updateProductImageController = async (req, res) => {
  try {
    const product = await getProduct(req.params.id);

    if (!product) {
      res.status(404).json({ error: "product not found" });
    }

    const buffer = await sharp(req.file.buffer)
      .resize({ width: 180, height: 180 })
      .png()
      .toBuffer();

    fs.writeFileSync(`src/public/images/${req.params.id}.png`, buffer);

    product.image = `/images/${req.params.id}.png`;

    await updateProduct(req.params.id, product);

    res.status(200).json({ product });
  } catch (error) {
    console.log("an error occured while getting product", error);
    res.status(500).json({ error });
  }
};

const getProductsController = async (req, res) => {
  try {
    const products = await getAllProducts(req.data);

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
