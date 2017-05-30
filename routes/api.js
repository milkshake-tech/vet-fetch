const express = require('express')
const router = express.Router()
const petController = require('../controllers/PetController')
const searchController = require('../controllers/SearchController')
const userController = require('../controllers/UserController')

const controllers = {
	pet: petController,
	user: userController,
	search: searchController
}

router.get('/:resource', (req, res) => {
	const resource = req.params.resource
	const controller = controllers[resource]

	if(controller === undefined){
		res.json({confirmation: 'Fail', message: 'Invalid Resource'})
		return
	}

	if(resource === 'user'){
		controller.get(req.query, false)
		.then(function(results){
			return res.json({ confirmation: 'Success', results: results })
		})
		.catch(function(err){
			return res.json({ confirmation: 'Fail', message: err })
		})
	}

	controller.get(req.query, false, function(err, results){
		if(err){
			return res.json({confirmation: "Fail", message: err})
		}

		return res.json({confirmation: "Success", results: results})
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
