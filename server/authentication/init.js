const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const authenticationMiddleware = require('./middleware')
const User = require('../user/User')
const userController = require('../user/UserController')
const bcrypt = require('bcryptjs')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  userController.getById(id, true)
  .then((result) => {
    return done(null, result.id)
  })
  .catch((err) => {
    return done(null)
  })
})

function initPassport(){
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    },
    function(email, password, done){
      let emailParam = email.toLowerCase()
      userController.get({email: emailParam}, true)
      .then((results) => {
        if(results.length === 0){
          return done(null, false)
        }

        let user = results[0]
        let correctPW = bcrypt.compareSync(password, user.password)
        if(correctPW === false){
          return done(null, false)
        }

        return done(null, user.summary())
      })
      .catch((err)=> {
        return done(err)
      })
    }
  ))

  passport.authenticationMiddleware = authenticationMiddleware
}

module.exports = initPassport
