const router = require('express').Router()
const UserService = require('../services/UserService')

router.get('/:username' , async (req , res) => {
  return res.json(await UserService.find({username: req.params.username}))
})

router.get('/art/:id' , async (req , res) => {
  return res.send(true)
})

module.exports = router