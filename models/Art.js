const {model , Schema} = require('mongoose')

require('./User')

const Art = new Schema({
  name: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
  },
  canvas: {
    type: Array,
    required: true
  },
  colorPalette: {
    type: Array,
    required: true,
  },
  creator: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'user',
    autopopulate: {maxDepth: 1}
  },
  contributors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
      autopopulate: {maxDepth: 1}
    }
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
      autopopulate: {maxDepth: 1}
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  },
} , {timestamps: true})

Art.plugin(require('mongoose-autopopulate'))

module.exports = model('art' , Art)