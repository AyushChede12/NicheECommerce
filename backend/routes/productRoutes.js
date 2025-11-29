const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductsById);
router.post("/create", upload.array("images", 10), productController.createProducts);
router.put("/update/:id", upload.array("images", 10), productController.updateProduct);
router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
