const React = require('react')
const ReactRouter = require('react-router')
const ReactDOMServer = require('react-dom/server')
const ServerApp = require('../public/dist/es5/ServerApp')
const layout = require('../public/dist/es5/components')
const userComponents = require('../public/dist/es5/user/components')
const vetSearchComponents = require('../public/dist/es5/vet-search/components')
const initial = require('../public//dist/es5/user/reducers/initial')
const store = require('../public/dist/es5/stores/store')
const userController = require('./UserController')
const bcrypt = require('bcryptjs')
const passport = require('passport')

matchRoutes = (req, routes) => {
	return new Promise((resolve, reject) => {
		ReactRouter.match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
			if(error){
				reject(error)
				return
			}

			resolve(renderProps)
		})
	})
}

function initUser (app){
	const endpoint = '/:resource'
	app.get('/', renderHome)
	app.get('/profile', passport.authenticationMiddleware(), renderProfile)
	app.get('/logout', (req, res) => {
  	req.logout();
  	res.json({confirmation: 'Success', result: 'You\'ve been logged out.'})
	})
	app.post('/login', passport.authenticate('local'), (req, res) => {
		res.json({confirmation: 'Success', result: req.user})
	})
	app.get(endpoint, renderHome)
}

function renderHome (req, res){
	renderReact(req, res, layout.Landing)
}

function renderProfile (req, res){
	renderReact(req, res, userComponents.UserProfile)
}

function renderReact(req, res, base){
	let initialData = initial()
	let initialState = null

	userController.getById(req.user, false)
	.then((result) => {

		if(result !== null){
			initialData['userReducer'] = {user: result, pets: null}
		} else {
			initialData['userReducer'] = {user: null, pets: null}
		}

		initialState = store.configureStore(initialData)

		let routes = {
			path: '/',
			component: ServerApp,
			initial: initialState,
			indexRoute: {
				component: base
			}
		}
		return matchRoutes(req, routes)
	})
	.then(function(renderProps){
		let html = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps))
		res.render('index', {
			react:html,
			preloadedState:JSON.stringify(initialState.getState())
		})
	})
	.catch((err) => {
		return res.json({ confirmation: 'Fail', message: err})
	})
}

module.exports = initUser
