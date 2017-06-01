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

	controller.get(req.query, false)
	.then((results) => {
		return res.json({ confirmation: 'Success', results: results })
	})
	.catch((err) => {
		return res.json({ confirmation: 'Fail', message: err })
	})
}

function getResourceById (req, res){
	const resource = req.params.resource
	const id = req.params.id
	const controller = controllers[resource]

	if (controller === null){
		return res.json({confirmation: 'Fail', message: 'Invalid Resource'})
	}

	controller.getById(id, false)
	.then((result) => {
		return res.json({ confirmation: 'Success', result: result})
	})
	.catch((err) => {
		return res.json({ confirmation: 'Fail', message: err})
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
			passportAuthenticate(result, req, res)
			// send account verification email
			return
		}

		return res.json({confirmation: 'Success', result: result})
	})
}

function passportAuthenticate (user, req, res){
	passport.authenticate('local')(req, res, () => {
		return res.json({confirmation: 'Success', result: user})
	})
}

function putToResource (req, res){
	const resource = req.params.resource
	const resourceId = req.params.id
	const controller = controllers[resource]

	if (controller === null){
		return res.json({confirmation: 'Fail', message: 'Invalid Resource'})
	}

	controller.put(resourceId, req.body, (err, result) => {
		if (err){
			return res.json({confirmation: 'Fail', message: err.message})
		}

		return res.json({confirmation: 'Success', result: result})
	})
}

module.exports = initAPI
