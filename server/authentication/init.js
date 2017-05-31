const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const authenticationMiddleware = require('./middleware')
const User = require('../user/User')
const userController = require('../user/UserController')

console.log('authentication INIT')

passport.serializeUser(function(user, cb){
  // cb(null, user.username)
})

passport.deserializeUser(function(username, cb){

})

function initPassport(){
  //TODO: Complete LocalStrategy init
  console.log('initPassport')
  passport.use(new LocalStrategy(
    function(email, password, done){
      console.log('EMAIL: '+JSON.stringify(email))
      console.log('PASSWORD: '+JSON.stringify(password))
      userController.get({email: email}, true)
      .then((user) => {
        done(null, user)
      })
      .catch((err)=> {
        done(err)
      })
      // User.find(email, (err, user) => {
      //   if(err){
      //     return done(err)
      //   }
      //   if(!user){
      //     return done(null, false)
      //   }
      //   if(password !== user.password){
      //     return done(null, false)
      //   }
      //   return done(null, user)
      // })
    }
  ))

  passport.authenticationMiddleware = authenticationMiddleware
}

module.exports = initPassport
