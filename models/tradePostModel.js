// tradePostModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: {
    type: String,
    default: 'Anonymous' // Assuming anonymous if author is not provided
  },
  content: {
    type: String,
    required: true
  }
}, { timestamps: true });

const tradePostSchema = new Schema({
  offer: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  typeOfOffer: {
    type: String,
    required: true
  },
  // votes: {
  //   type: Number,
  //   default: 0
  // },
  upVotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  downVotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  comments: [commentSchema] // Adding comments array to store comments
});

module.exports = mongoose.model("tradePostModel", tradePostSchema);