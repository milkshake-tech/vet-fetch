const express = require('express')
const passport = require('passport')
const session = require('express-session')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const request = require('request')
const config = require('../config/database')
require('dotenv').config()

let mongUrl

if(process.env.NODE_ENV !== 'production'){
  mongoUrl = config.db['development']
}

mongoose.connect(mongoUrl, (err, res) => {
  if(err){
    console.log('DB Connection Failed:'+err)
  }

  console.log('DB Connection Success: '+mongoUrl)
})

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'mustache')
app.engine('mustache', require('hogan-middleware').__express)

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

require('./authentication').init(app)

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, 'public')))

require('./user').init(app)
require('./api').init(app)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
