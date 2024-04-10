const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Category must have a name"],
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

categorySchema.pre(/^find/, function (next) {
  this.populate({
    path: "creator",
    select: "email",
  });

  next();
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
