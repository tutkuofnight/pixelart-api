const express = require('express')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')
const User = require('./models/User')
const helmet = require('helmet')
const cors = require('cors')
const { auth } = require('./middleware')
const app = express()

require('dotenv').config()

app.use(express.urlencoded({ extended: false }))
app.use(express.json({limit: '50mb'}))
app.use(helmet())
app.use(cors({ credentials: true }))
app.use(session({
  name: 'user-session',
  secret: process.env.AUTH_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    stringify: false,
    autoRemove: 'native',
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24
  },
  proxy: true
}))

// Passport initialize
app.use(passport.initialize())
app.use(passport.session())
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use('/account' , require('./routes/account'))
app.use('/user' , auth , require('./routes/user'))
app.use('/' , require('./routes'))

app.listen(process.env.PORT, () => {
  require('./config/mongodb')()
  console.log(`Server working on: ${process.env.PORT}`)
})
