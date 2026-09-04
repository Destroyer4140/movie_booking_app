const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { USER_ROLE, USER_STATUS} = require('../utils/constants');

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
    enum: {
      values: [USER_ROLE.customer, USER_ROLE.admin, USER_ROLE.client],
      message: "Invalid user role given"
    },
    default: USER_ROLE.customer
  },
  userStatus: {
    type: String,
    required: true,
    enum: {
      values: [USER_STATUS.approved, USER_STATUS.pending, USER_STATUS.rejected],
      message: "Invalid status for user given"
    },
    default: USER_STATUS.approved
  },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    // a trigger to encrypt the plain password before saving the user
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

/**
 * This is going to be an instance method for user, to compare password with the hashed password stored in database.
 * @param password :- Input password given by user during singin or login.
 * @returns boolean denoting whether the input password is valid or not.
 */
userSchema.methods.isValidPassword = async function (password) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
}

const User = mongoose.model('User', userSchema);

module.exports = User;