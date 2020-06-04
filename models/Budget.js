const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Expense Schema 
const BudgetSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, 
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

module.exports = Budget = mongoose.model("budgets", BudgetSchema);