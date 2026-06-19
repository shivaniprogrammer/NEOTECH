const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  googleId: { type: String },
password: { type: String, minlength: 6 },// remove required:true
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);