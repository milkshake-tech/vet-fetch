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

	if(controller === null){
		res.json({confirmation: 'Fail', message: 'Invalid Resource'})
		return
	}

	controller.get(req.query, false, function(err, results){
		if(err){
			res.json({confirmation: "Fail", message: err})
				return
			}

		res.json({confirmation: "Success", results: results})
  	return
	})
})

router.get('/:resource/:id', function(req, res, next){
	var resource = req.params.resource
	var id = req.params.id
	var controller = controllers[resource]

	if (controller === null){
		res.json({confirmation: 'Fail', message: 'Invalid Resource'})
		return
	}

	controller.getById(id, true, function(err, result){
		if(err){
			res.json({confirmation: 'Fail', message: err.message})
			return
		}

		res.json({confirmation: "Success", result: result})
		return
	})

})

router.post('/:resource', function(req, res, next){
	var resource = req.params.resource
	var controller = controllers[resource]

	if (controller === null){
		res.json({confirmation: 'Fail', message: 'Invalid Resource'})
		return
	}

	controller.post(req.body, function(err, result){
		if(err){
			res.json({confirmation: 'Fail', message: err.message})
			return
		}
		console.log('Line 69 API POST BODY: '+JSON.stringify(req.body))
		console.log('Line 70 API POST RESULT: '+JSON.stringify(result))

		if (resource === 'user') {
			//send account verification email
			req.session.user = result.id
		}

		res.json({confirmation: 'Success', result: result})
		return
	})
})

router.put('/:resource/:id', function(req, res, next){
	var resource = req.params.resource
	var resourceId = req.params.id

	var controller = controllers[resource]
	if (controller === null){
		res.json({confirmation: 'Fail', message: 'Invalid Resource'})
		return
	}

	controller.put(resourceId, req.body, function(err, result){
		if (err){
			res.json({confirmation: 'Fail', message: err.message})
			return
		}

		res.json({confirmation: 'Success', result: result})
		return
	})
})

module.exports = router
