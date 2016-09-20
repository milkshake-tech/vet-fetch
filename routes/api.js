var express = require('express');
var router = express.Router();
var petController = require('../controllers/PetController');
var profileController = require('../controllers/ProfileController');
var vetController = require('../controllers/VetController')

var controllers = {
	pet: petController,
	profile: profileController,
	vet: vetController
}

router.get('/:resource', function(req, res, next) {
	var resource = req.params.resource
	var controller = controllers[resource]

	if(controller == null){
		res.json({
			confirmation: 'Fail',
			message: 'Invalid Resource'
		})
	}

	controller.get(req.query, null, function(err, results){
		if(err){
			res.json({
				confirmation: "Fail",
				message: err
			})
				return
			}

		res.json({
  			confirmation: "Success",
  			results: results
  		})
  			return
	})
})

router.get('/:resource/:id', function(req, res, next){
	var resource = req.params.resource
	var id = req.params.id
	var controller = controllers[resource]

	if (controller == null){
		res.json({
			confirmation: 'Fail',
			message: 'Invalid Resource'
		})
		return
	}

	controller.getById(id, true, function(err, result){
		if(err){
			res.json({
				confirmation: 'Fail',
				message: err.message
			})
			return
		}

		res.json({
			confirmation: "Success",
			result: result
		})
		return
	})
	
})

router.post('/:resource', function(req, res, next){
	var resource = req.params.resource
	var controller = controllers[resource]

	if (resource == 'profile'){
		var params = req.body
		
		console.log('SIGN UP POST PARAMS: '+JSON.stringify(params))

		var sendgrid = require('sendgrid')(process.env.SENDGRID_API_KEY)

		var welcomeSignUp = "Hi there! Welcome to Vet Fetch!"

		sendgrid.send({
				to: 'katrina@milkshake.tech',
				from: 'katrina@milkshake.tech',
				subject: "Welcome!",
				text: welcomeSignUp
		}, function(err){
				
		})
	}

	if (controller == null){
		res.json({
			confirmation: 'Fail',
			message: 'Invalid Resource'
		})
		return
	}

	controller.post(req.body, function(err, result){
		if(err){
			res.json({
				confirmation: 'Fail',
				message: err.message
			})
			return
		}

		if (resource == 'profile') //install cookie
			req.session.user = result.id

			res.json({
				confirmation: 'Success',
				result: result
			})

		return
	})
})

router.put('/:resource/:id', function(req, res, next){
	var resource = req.params.resource
	var resourceId = req.params.id

	var controller = controllers[resource]
	if (controller == null){
		res.json({
			confirmation: 'Fail',
			message: 'Invalid Resource'
		})
		return
	}

	controller.put(resourceId, req.body, function(err, result){
		if (err){
			res.json({
				confirmation: 'Fail',
				message: err.message
			})
			return
		}

		res.json({
			confirmation: 'Success',
			result: result
		})
			return
	})
})


module.exports = router
