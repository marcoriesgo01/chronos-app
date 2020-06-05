const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Expense Schema 
const ReviewSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  rating: {
    type: Number,
    required: true
  },
  reviewedUser: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  comment: {
      type: String,
      required: false
  }
});

module.exports = Review = mongoose.model("reviews", ReviewSchema);