// const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'A user must have a name'],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Please provide a valid email'],
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error(`password musn't contain password`);
        }
      },
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // This only works on CREATE and SAVE
        validator: function (el) {
          return el === this.password; //only true if same as password
        },
        message: 'Passwords do not match',
      },
    },
  },
  { timestamps: true },
);

// Static method to find user by credentials
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email }).select('+password'); //+password is because it is not included in the queries by default
  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch);
  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  //Only need the confirmation when signing up, it does not need to be saved anywhere. Once validation is completed we do not need it in the database
  this.passwordConfirm = undefined;
  next();
});

// Instance method, method that is available for all methods of a certain collection
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword, //have to pass in userPassword bc password select is false, therefore can't use 'this' in function
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
