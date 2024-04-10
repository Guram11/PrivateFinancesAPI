const catchAsync = require("../util/catchAsync");
const factory = require("./handlerFactory");
const Category = require("../models/categoryModel");
const User = require("../models/userModel");

exports.getAllCategories = factory.getAll(Category);
exports.getCategoryById = factory.getOne(Category);
exports.updateCategory = factory.updateOne(Category);
exports.deleteCategory = factory.deleteOne(Category);

exports.createCategory = catchAsync(async (req, res, next) => {
  const createdCategory = new Category({
    ...req.body,
    creator: req.user.id,
  });

  const newCategory = await Category.create(createdCategory);

  res.status(201).json({
    status: "success",
    data: {
      category: newCategory,
    },
  });
});
