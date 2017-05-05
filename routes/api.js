var express = require('express')
var router = express.Router()
var petController = require('../controllers/PetController')
var searchController = require('../controllers/SearchController')
var userController = require('../controllers/UserController')

var controllers = {
	pet: petController,
	user: userController,
	search: searchController
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

	controller.get(req.query, function(err, results){
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

		if (resource == 'user') //install cookie
			req.session.user = result.id

			res.json({
				confirmation: 'Success',
				result: result
			})

			var params = req.body
			var signUpEmail = params.email
			var username = params.username
			var emailContent = 'Hi '+username+'! Welcome to Vet Fetch'

			console.log('SIGN UP POST PARAMS: '+JSON.stringify(params))

			var sendgrid = require('sendgrid')(process.env.SENDGRID_API_KEY)
			// var sendgrid = require('sendgrid')(sgkey)

			var request = sendgrid.emptyRequest({
				method: 'POST',
				path: '/v3/mail/send',
				body: {
					personalizations: [
					{
						to: [
						{email: signUpEmail,},
						],
						subject: 'Vet Fetch Account Confirmation',
					},
					],
					from: {
						email: 'katrina@milkshake.tech',
					},
					content: [
						{
							type: 'text/plain',
							value: emailContent,
						},
					],
				},
			})

			sendgrid.API(request, function(error, response){
				if (error){
					console.log('Error response received')
				}
				console.log('SENDGRID SC==='+JSON.stringify(response.statusCode))
				console.log('SENDGRID ==='+JSON.stringify(response.body))
				console.log('SENDGRID HEADERS==='+JSON.stringify(response.headers))
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
