const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    image1: { type: String },
    image2: { type: String },
    image3: { type: String },
    image4: { type: String },
  },
  { _id: false },
);

const bootSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  colorway: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: imageSchema,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sizes: [
    {
      size: Number,
      quantity: Number,
    },
  ],
  popular: {
    type: Boolean,
    default: false,
  },
});

const Boot = mongoose.model('Boot', bootSchema);
module.exports = Boot;
