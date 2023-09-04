const router = require('express').Router()
const UserService = require('../services/UserService')
const passport = require('passport')
const {auth} = require('../middleware')

router.get('/me' , auth , (req , res) => {
  return res.json(req.user)
})

router.post('/register' , async (req , res) => {
  const answer = UserService.register(req.body)
  return res.json(answer)
})

router.post('/login' , passport.authenticate("local") , async (req , res) => {
  return res.json(req.user)
})

router.get('/logout' , async (req , res) => {
  req.logout(function(err) {
    if (err) return res.send("Logout Error:" , err)
    return res.redirect('/tutkuofnight')
  })
})

router.post('/forgot-password' , async (req ,res) => {

})

router.put('/update' , async (req ,res) => {
  const answer = await UserService.update(req.user , req.body)
  if(answer) return res.json(answer)
  else return res.json({message: 'User cannot updated'})
})

module.exports = router