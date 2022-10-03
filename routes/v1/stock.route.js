const express = require("express");
const router = express.Router();
const stockController = require("../../controllers/stock.controller");

// router.route("/bulk-update").patch(productController.bulkUpdateProducts);
// router.route("/bulk-delete").delete(productController.bulkDeleteProducts);

router
  .route("/")
  .get(stockController.getStocks)
  .post(stockController.createStock);

router
  .route("/:id")
  .patch(stockController.updateStockById)
  .delete(stockController.deleteStockById);

module.exports = router;
