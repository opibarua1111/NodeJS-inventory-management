const express = require("express");
const router = express.Router();
const productController = require("../../controllers/product.controller");
const authorization = require("../../middleware/authorization");
const uploder = require("../../middleware/uploder");
const verifyToken = require("../../middleware/verifyToken");

router.post(
  "/file-upload",
  uploder.array("image"),
  productController.fileUpload
);

router.route("/bulk-update").patch(productController.bulkUpdateProducts);
router.route("/bulk-delete").delete(productController.bulkDeleteProducts);
router
  .route("/")
  .get(productController.getProducts)
  .post(
    verifyToken,
    authorization("admin", "store-manager"),
    productController.createProduct
  );

router
  .route("/:id")
  .patch(productController.updateProductById)
  .delete(productController.deleteProductById);

module.exports = router;
