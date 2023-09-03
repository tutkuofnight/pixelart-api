const {model , Schema} = require('mongoose')
require('./Art')

const User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  avatar: {
    type: String,
  },
  biography: {
    type: String,
  },
  arts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'art',
      autopupulate: true
    }
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
      autopupulate: {maxDepth: 1},
    }
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
      autopupulate: {maxDepth: 1},
    }
  ],
  saved: {
    type: Array,
    default: [],
  },
  verified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: 'USER'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  },
} , {timestamps: true})

module.exports = model('user' , User)