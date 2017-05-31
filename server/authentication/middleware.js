function authenticationMiddleware(){
  console.log('1. authenticationMiddleware')
  return function(req, res, next){
    console.log('2. authenticationMiddleware')
    if(req.isAuthenticated()){
      console.log('3. authenticationMiddleware')
      return next()
    }

    console.log('4. authenticationMiddleware')
    res.redirect('/')
  }
}

module.exports = authenticationMiddleware
