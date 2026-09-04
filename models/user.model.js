const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email'],
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  userRole: {
    type: String,
    required: true,
    default: 'CUSTOMER',
  },
  userStatus: {
    type: String,
    required: true,
    default: 'APPROVED',
  },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);
  this.password = hash;
});



const User = mongoose.model('User', userSchema);

module.exports = User;