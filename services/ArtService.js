const BaseService = require('./BaseService')
const ArtModel = require('../models/Art')

class ArtService extends BaseService {
  constructor(){
    super(ArtModel)
  }
}

module.exports = new ArtService()