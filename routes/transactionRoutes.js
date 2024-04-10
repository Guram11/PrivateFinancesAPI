const express = require("express");

const authController = require("../controllers/authController");
const transactionControllers = require("../controllers/transactionControllers");

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router.get("/", transactionControllers.getAllTransactions);
router.post("/", transactionControllers.createTransaction);
router.get("/:id", transactionControllers.getTransactionById);
router.delete("/:id", transactionControllers.deleteTransaction);
// router.patch("/:id", transactionControllers.updateTransaction);

module.exports = router;
