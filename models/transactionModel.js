const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    description: {
      type: String,
      required: [true, "Transaction must have a name"],
    },
    amount: {
      type: Number,
      required: [true, "Transaction must have an amount"],
    },
    status: {
      type: String,
      enum: ["processing", "completed"],
      required: [true, "Transaction must have a status"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    type: {
      type: String,
      enum: ["income", "outcome"],
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
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

transactionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name",
  }).populate({
    path: "creator",
    select: "name",
  });

  next();
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
