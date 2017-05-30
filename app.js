const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const sessions = require('client-sessions')
const cloudinary = require('cloudinary')
const request = require('request')
const config = require('./config/database')
const routes = require('./routes/index')
const api = require('./routes/api')
const user = require('./routes/user')
require('dotenv').config()

const mongoUrl = config.db[process.env.NODE_ENV]
mongoose.connect(mongoUrl, function(err, res){
  if(err){
    console.log('DB Connection Failed:'+err)
  }

  console.log('DB Connection Success:'+mongoUrl)
})

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'mustache')
app.engine('mustache', require('hogan-middleware').__express)

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(sessions({
  cookieName: 'session',
  secret: 'akakakafj',
  duration: 24*60*60*1000,
  activeDuration: 30*60*1000
}))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)
app.use('/api', api)
app.use('/user', user)

app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
