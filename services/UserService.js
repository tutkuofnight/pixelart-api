const BaseService = require('./BaseService')
const UserModel = require('../models/User')

class User extends BaseService {
  constructor() {
    super(UserModel)
  }
  register(data){
    UserModel.register(
      new UserModel(data),
      data.password,
      function (err, data) {
        if (err) {
          return err
        }
        return data
      }
    )
  }
  login(){

  }
}

module.exports = new User()