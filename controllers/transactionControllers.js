const catchAsync = require("../util/catchAsync");
const factory = require("./handlerFactory");
const Transaction = require("../models/transactionModel");
const Category = require("../models/categoryModel");

exports.getAllTransactions = catchAsync(async (req, res, next) => {
  const queryObj = { ...req.query };

  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]);

  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  let query = Transaction.find(JSON.parse(queryStr));

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("date");
  }

  const doc = await query;

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: doc.length,
    data: {
      data: doc,
    },
  });
});
exports.getTransactionById = factory.getOne(Transaction);
exports.deleteTransaction = factory.deleteOne(Transaction);
// exports.updateTransaction = factory.updateOne(Transaction);

exports.createTransaction = catchAsync(async (req, res, next) => {
  let category = await Category.findOne({ name: req.body.category });
  const defaultCategory = await Category.findOne({ name: "Default Category" });

  if (!category && !defaultCategory) {
    category = await Category.create({
      name: "Default Category",
      creator: req.user.id,
    });
  }

  const createdTransaction = new Transaction({
    ...req.body,
    creator: req.user.id,
    category: category || defaultCategory,
    type: req.body.amount > 0 ? "income" : "outcome",
  });

  const newTransaction = await Transaction.create(createdTransaction);

  res.status(201).json({
    status: "success",
    data: {
      transaction: newTransaction,
    },
  });
});
