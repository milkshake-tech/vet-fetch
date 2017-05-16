var express = require('express');
var router = express.Router();
var {ReactRouter} = require('react-router')
var ReactDOMServer = require('react-dom/server')
var {createStore} = require('redux')
// var vetFetchApp = require('../src/reducers')
var createHistory = require('history').createMemoryHistory

matchRoutes = function(req, routes){
	return new Promise(function(resolve, reject){
		ReactRouter.match({routes, location: req.url}, function(error, redirectLocation, renderProps){
			if(error){
				reject(error)
				return
			}
			resolve(renderProps)
		})
	})
}

router.get('/', function(req, res, next) {
	res.render('index', {title:'vetFetch'})
});

router.get('/:page', function(req, res, next) {
	res.render('index', {title:'vetFetch'})
});

// router.get('/:page', function(req, res, next){
// 	let history = createHistory()
//
// 	let routes = createRoutes(history)
// 	return matchRoutes(req, routes)
// 	.then(function(renderProps){
// 		var html = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps))
// 		res.render('index', {
// 			react:html,
// 			preloadedState:JSON.stringify(store.getState())
// 		})
// 	})
// 	.catch(function(err){
// 		console.log('INDEX ROUTE ERROR 1: '+err)
// 		return
// 	})
// })

module.exports = router;
