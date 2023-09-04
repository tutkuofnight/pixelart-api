const router = require('express').Router()
const UserService = require('../services/UserService')

router.post('/follow/:uid' , async (req , res) => {
  const answer = await UserService.follow(req.params.uid , req.user)
  return res.json(answer)
})


module.exports = router