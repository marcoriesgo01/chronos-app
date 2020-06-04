const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Bills Schema
const BillSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, 
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  dueDate: {
    type: String,
    required: true
  },
  categoryId: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

module.exports = Bill = mongoose.model("bills", BillSchema);