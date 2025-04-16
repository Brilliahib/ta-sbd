const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
} = require("../../middlewares/auth-middleware");
const userController = require("../../controllers/user/user-controller");

const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, userController.createUser);

router.get("/", authMiddleware, adminMiddleware, userController.getAllUsers);

router.get(
  "/email/:email",
  authMiddleware,
  adminMiddleware,
  userController.getUserByEmail
);

router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  userController.getDetailUser
);

router.get(
  "/:id/products",
  authMiddleware,
  adminMiddleware,
  userController.getUserProducts
);

router.put("/:id", authMiddleware, adminMiddleware, userController.updateUser);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  userController.deleteUser
);

module.exports = router;
