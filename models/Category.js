const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Expense Schema 
const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

module.exports = Category = mongoose.model("categories", CategorySchema);