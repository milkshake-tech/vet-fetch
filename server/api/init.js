const petController = require('../pet/PetController')
const searchController = require('../veterinarian/SearchController')
const userController = require('../user/UserController')
const passport = require('passport')

const controllers = {
	pet: petController,
	user: userController,
	search: searchController
}

const endpoint = '/api/:resource'
const endPointID = '/:id'

function initAPI (app){
	app.get(endpoint, getResource)
	app.get(endpoint+endPointID, getResourceById)
	app.post(endpoint, postToResource)
	app.put(endpoint+endPointID, putToResource)
}

function getResource (req, res){
	const resource = req.params.resource
	const controller = controllers[resource]

	if(controller === undefined){
		return res.json({confirmation: 'Fail', message: 'Invalid Resource'})
	}

	if(resource === 'user'){
		controller.get(req.query, false)
		.then((results) => {
			return res.json({ confirmation: 'Success', results: results })
		})
		.catch((err) => {
			return res.json({ confirmation: 'Fail', message: err })
		})
	}

	controller.get(req.query, false, (err, results) => {
		if(err){
			return res.json({confirmation: "Fail", message: err})
		}

		return res.json({confirmation: "Success", results: results})
	})
}

function getResourceById (req, res){
	const resource = req.params.resource
	const id = req.params.id
	const controller = controllers[resource]

	if (controller === null){
		return res.json({confirmation: 'Fail', message: 'Invalid Resource'})
	}

	controller.getById(id, true, (err, result) => {
		if(err){
			return res.json({confirmation: 'Fail', message: err.message})
		}

		return res.json({confirmation: "Success", result: result})
	})
}

function postToResource (req, res){
	const resource = req.params.resource
	const controller = controllers[resource]

	if (controller === null){
		return res.json({confirmation: 'Fail', message: 'Invalid Resource'})
	}

	controller.post(req.body, (err, result) => {
		if(err){
			return res.json({confirmation: 'Fail', message: err.message})
		}

		if (resource === 'user') {
			//send account verification email
			passport.authenticate('local'), {
				successRedirect: '/profile',
				failureRedirect: '/'
			}
		}

		return res.json({confirmation: 'Success', result: result})
	})
}

function putToResource (req, res){
	const resource = req.params.resource
	const resourceId = req.params.id
	const controller = controllers[resource]

	if (controller === null){
		return res.json({confirmation: 'Fail', message: 'Invalid Resource'})
	}

	controller.put(resourceId, req.body, function(err, result){
		if (err){
			return res.json({confirmation: 'Fail', message: err.message})
		}

		return res.json({confirmation: 'Success', result: result})
	})
}

module.exports = initAPI
