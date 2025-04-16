const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
} = require("../../middlewares/auth-middleware");
const productController = require("../../controllers/product/product-controller");
const upload = require("../../middlewares/upload-middleware");

const router = express.Router();

router.get("/", productController.getAllProduct);

router.get("/soft-delete", productController.getAllProductSoftDeleted);

router.get("/:id", productController.getDetailProduct);

router.get("/category/:id", productController.getProductByCategory);

router.get("/user/:id", productController.getProductUser);

router.use(authMiddleware);

router.get("/users/list", productController.getAllProductUser);

router.delete("/:id", productController.deleteProduct);

router.post("/", upload.single("image_url"), productController.createProduct);

router.put("/:id", upload.single("image_url"), productController.updateProduct);

router.put("/soft-delete/:id", productController.softDeleteProduct);

router.put("/restore/:id", productController.restoreProduct);

module.exports = router;
