const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  refreshToken: {
    type: String
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Please use a valid mobile number']
  },
  shopName: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);
