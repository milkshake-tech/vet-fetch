import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import Main from './components/Main'
import store from './stores/store'
import { Provider } from 'react-redux'

const app = (
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Main} />
		</Router>
	</Provider>
)

ReactDOM.render(app, document.getElementById('app'))
