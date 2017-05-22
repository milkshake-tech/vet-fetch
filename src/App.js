import React, { Component } from 'react'
console.log('Line 2 react app.js '+process.env.NODE_ENV)

import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import Main from './components/Main'
import {Landing} from './components'
import {SearchResults} from './vet-search/components'
import {Questionnaire1, Questionnaire2, Questionnaire3, SurveyThankyou} from './pet-survey/components'
import {UserCapture, UserProfile} from './user/components'
import store from './stores/store'
import { Provider } from 'react-redux'

const initialState = window.__PRELOADED_STATE__

const app = (
	<Provider store={store.configureStore(initialState)}>
		<Router history={browserHistory}>
			<Route path="/" component={Main}>
				<IndexRoute component={Landing} />
				<Route path="/searchresults" component={SearchResults} />
				<Route path="/survey-1" component={Questionnaire1} />
				<Route path="/survey-2" component={Questionnaire2} />
				<Route path="/survey-3" component={Questionnaire3} />
				<Route path="/profile" component={UserProfile} />
				<Route path="/signup" component={UserCapture} />
				<Route path='/thankyou' component={SurveyThankyou} />
			</Route>
		</Router>
	</Provider>
)

ReactDOM.render(app, document.getElementById('app'))
