const express = require('express')
const passport = require('passport')
const session = require('express-session')
const helmet = require('helmet')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const request = require('request')
const config = require('../config/database')
require('dotenv').config()

let sess = {
  secret: 'povinfjnlsekjnger',
  resave: false,
  cookie: {
    httpOnly: true,
    maxAge: 3600000,
    domain: 'www.vetfetch.io',
    secure: true,
    path: '/'
  },
  saveUninitialized: false,
  name: 'vetFetchID'
}

let mongoURL = config.db['production']

if(process.env.NODE_ENV !== 'production'){
  mongoURL = config.db['development']
  sess.cookie.domain = '127.0.0.1'
  sess.cookie.secure = false
}

mongoose.connect(mongoURL, (err, res) => {
  if(err){
    console.log('DB Connection Failed:'+err)
  }
  console.log('ENV: ', process.env.NODE_ENV)
  console.log('DB Connection Success: '+mongoURL)
})

const app = express()

app.use(helmet())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'mustache')
app.engine('mustache', require('hogan-middleware').__express)

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

require('./authentication').init(app)

app.use(session(sess))

app.use(passport.initialize())
app.use(passport.session())

if (app.get('env') === 'production'){
  app.use(function (req, res, next){
    if (req.headers['x-forwarded-proto'] === 'https'){
      return next()
    }
    return res.redirect('https://'+req.headers.host + req.url)
  })
}

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
