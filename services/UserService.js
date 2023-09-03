const BaseService = require('./BaseService')
const UserModel = require('../models/User')

class User extends BaseService {
  constructor() {
    super(UserModel)
  }
}

module.exports = User