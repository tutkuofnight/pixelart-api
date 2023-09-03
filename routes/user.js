const router = require('express').Router()
const UserService = require('../services/UserService')

router.get('/me' , async (req , res) => {
  const user = {}
  res.json(user)
})

router.post('/register' , async (req , res) => {
  res.send('true')
})

router.post('/login' , async (req , res) => {
  res.send('true')  
})

router.post('/forgot-password' , async (req ,res) => {

})

router.put('/update' , async (req ,res) => {

})

module.exports = router