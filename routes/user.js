var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserController');
var bcrypt = require('bcryptjs')

router.get('/:action', function(req, res, next){
	var action = req.params.action

	if (action === 'logout'){
		let userID = req.session.user
		userController.get({id: userID}, null, function(err, result){

			if (err) {
				res.json({confirmation: 'Fail', message: err.message})
				return
			}
			req.session.reset()
			res.json({confirmation: 'Success', message: 'Logged out. Goodbye!'})
			return
		})
	}

	if (action === 'currentuser'){
		if (req.session === null){
			res.json({confirmation: 'Fail', message: 'No Current User: No session in place.'})
			return
		}

		if (req.session.user === null){
			res.json({confirmation: 'Fail', message: 'No Current User: No user in current session.'})
			return
		}

		var userID = req.session.user
		userController.getById(userID, null, function(err, result){
			if (err){
				res.json({confirmation: 'Fail', message: err.message})
			return
			}

			res.json({confirmation: 'Success', user: result})
			return
		})
	}
})


router.post('/:action', function(req, res, next){
	var action = req.params.action

	if (action === 'login'){
		var credentials = req.body
		var email = credentials.email.toLowerCase()

		userController.get({email: email}, true, function(err, results){

			if (results.length === 0){
				res.json({
					confirmation: 'Fail',
					message: 'User Email Not Found. Please check spelling and try again.'
				})
				return
			}

			var profile = results[0]
			var passwordCorrect = bcrypt.compareSync(credentials.password, profile.password)

			if (err){
				res.json({
					confirmation: 'Fail',
					message: err
				})
				return
			}

			if (passwordCorrect == false){
				res.json({
					confirmation: 'Fail',
					message: 'Incorrect Password. Please check spelling and try again.'
				})
				return
			}

			// install cookie to track current user
			var profileSummary = profile.summary()
			req.session.user = profileSummary.id

			res.json({
				confirmation: 'Success',
				currentUser: profileSummary
			})

			return

		})
	}
})

module.exports = router
