const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Expense Schema
const ExpenseSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, 
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  purpose: {
    type: String,
    required: true
  }
});

module.exports = Expense = mongoose.model("expenses", ExpenseSchema);