const mongoose = require("mongoose");
const md5 = require("md5");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  favorites: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: 'Post'
  }
});

// Create and add an avatar to a user
UserSchema.pre("save", function(next) {
  this.avatar = `http://gravatar.com/avatar/${md5(this.username)}?d=identicon`
  next()
})

// Hash the password so that it cannot be seen w/ database access
UserSchema.pre("save", function(next) {
  if(!this.isModified("password")) {
    return next()
  }

  bcrypt.genSalt
})

module.exports = mongoose.model('User', UserSchema);