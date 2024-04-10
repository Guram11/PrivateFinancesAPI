const express = require("express");

const authController = require("../controllers/authController");
const categoryControllers = require("../controllers/categoryControllers");

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router.get("/", categoryControllers.getAllCategories);
router.post("/", categoryControllers.createCategory);
router.get("/:id", categoryControllers.getCategoryById);
router.patch("/:id", categoryControllers.updateCategory);
router.delete("/:id", categoryControllers.deleteCategory);

module.exports = router;
