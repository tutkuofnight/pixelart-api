const {model , Schema} = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
require('./Art')

const User = new Schema({
  fullname: {
    type: String,
  },
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
      autopupulate: true,
    }
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
      autopupulate: true,
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

User.plugin(passportLocalMongoose , {
  populateFields: ['username' , 'email']
})

User.plugin(require('mongoose-autopopulate'))

module.exports = model('user' , User)