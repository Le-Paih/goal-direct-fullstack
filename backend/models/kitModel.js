const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    image1: { type: String },
    image2: { type: String },
  },
  { _id: false },
);

const kitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  team: {
    type: String,
    required: true,
    trim: true,
  },
  league: {
    type: String,
    trim: true,
  },
  nation: {
    type: Boolean,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: imageSchema,
    required: true,
  },
  sizes: [
    {
      size: String,
      quantity: Number,
    },
  ],
});

const Kit = mongoose.model('Kit', kitSchema);
module.exports = Kit;
