const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const cartSchema = mongoose.Schema({
  owner: {
    type: ObjectId,
    required: true,
    ref: 'User',
    index: true,
  },
  items: [
    {
      itemType: {
        type: String,
        required: true,
        enum: ['Boot', 'Kit'],
      },
      itemId: {
        type: ObjectId,
        refPath: 'items.itemType', // Dynamically reference Boot or Kit Model
        required: true,
      },
      name: String,
      description: String,
      size: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
          validator: function (v) {
            return typeof v === 'string' || typeof v === 'number';
          },
          message: (props) => `${props.value} is neither a string nor a number`,
        },
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
      },
      price: Number,
    },
  ],
  bill: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'Bill cannot be negative'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 10, // 10 minutes in seconds
  },
});

// Pre-save hook to calculate the total bill
// Before saving a cart, this hook recalculates the bill by summing up the total cost of all items. This ensures the bill is always accurate based on the current items and their quantities
cartSchema.pre('save', function (next) {
  this.bill = this.items.reduce(
    (total, item) => total + item.price * item.qantity,
    0,
  );
  next();
});

// Index the owner field for optimizes queries
cartSchema.index({ owner: 1 });

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
