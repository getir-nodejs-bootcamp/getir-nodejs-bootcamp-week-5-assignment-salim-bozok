const express = require("express");
const {
  createProductController,
  getProductController,
  updateProductController,
  updateProductImageController,
  getProductsController,
} = require("../controllers/products");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const {
  createProductSchema,
  updateProductSchema,
  getProductsSchema,
} = require("../validations/products");
const router = express.Router();

router.post(
  "/",
  auth,
  validate(createProductSchema, "body"),
  createProductController
);
router.get("/", validate(getProductsSchema, "query"), getProductsController);
router.get("/:id", getProductController);
router.patch(
  "/:id",
  auth,
  validate(updateProductSchema, "body"),
  updateProductController
);
router.patch("/:id/image", auth, updateProductImageController);

module.exports = router;
