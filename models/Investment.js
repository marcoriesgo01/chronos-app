const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Expense Schema 
const InvestmentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, 
    ref: "users"
  },
  companyName: {
    type: String,
    required: true
  },
  stockTag: {
    type: String,
    required: true
  },
  numberOfShares: {
    type: String,
    required: true
  }
});

module.exports = Investment = mongoose.model("investments", InvestmentSchema);