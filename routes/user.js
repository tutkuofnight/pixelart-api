const router = require('express').Router()
const UserService = require('../services/UserService')
const passport = require('passport')
router.get('/me' , async (req , res) => {
  const user = {}
  res.json(user)
})

router.post('/register' , async (req , res) => {
  const answer = await UserService.register(req.body)
  console.log(answer)
  return res.json(answer)
})

router.post('/login' , passport.authenticate("local") , async (req , res) => {
  return res.json(req.session)
})

router.post('/forgot-password' , async (req ,res) => {

})

router.put('/update' , async (req ,res) => {

})

module.exports = router