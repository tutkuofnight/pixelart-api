const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken')
const session = require('express-session')

const app = express()
require('dotenv').config()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  secret: process.env.AUTH_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: true,
  }
}))

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.AUTH_SECRET
}

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {
  return done(null, { id: jwtPayload.sub })
}))

app.post('/api/login', (req, res) => {
  const user = {
    id: 1,
    username: 'user1'
  }

  // Create jwt token
  const token = jwt.sign({ sub: user.id }, process.env.AUTH_SECRET)

  res.json({ token })
})


app.get('/api/secure', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'Success' })
})

// Sunucuyu dinlemeye başlayın
app.listen(process.env.PORT, () => {
  require('./config/mongodb')()
  console.log(`Server working on: ${process.env.PORT}`)
})
