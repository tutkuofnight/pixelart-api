const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const MongoStore = require('connect-mongo')
const User = require('./models/User')
const helmet = require('helmet')
const cors = require('cors')
const app = express()

require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(helmet())
app.use(cors({ credentials: true }))
app.use(session({
  secret: process.env.AUTH_SECRET,
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    stringify: false,
    autoRemove: 'native'
  }),
  cookie: {
    secure: true,
    maxAge: 1000 * 60 * 60 * 24
  },
}))

// Passport initialize
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use('/user' , require('./routes/user'))

app.listen(process.env.PORT, () => {
  require('./config/mongodb')()
  console.log(`Server working on: ${process.env.PORT}`)
})
