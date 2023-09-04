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
        if (err) return err
        return data
      }
    )
  }
  async follow(uid, user){
    const followingUser = await this.findById(uid)
    if(followingUser.followes.find(id => id === uid)){
      user.following.filter(id => id !== uid)
      followingUser.followers.filter(id => id !== uid)
    }
    else {
      user.following.push(followingUser)
      followingUser.followers.push(user)
    }
    await this.update(user._id , user)
    return await this.update(uid , followingUser)

  }
}

module.exports = new User()