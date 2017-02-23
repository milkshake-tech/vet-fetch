import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import Main from './components/Main'
import {Landing, InsuranceDetail, InsuranceResults, PetAdoptionSurvey, PetInsuranceSurvey, Questionnaire1, Questionnaire2, Questionnaire3, UserCapture, UserProfile} from './components'
import store from './stores/store'
import { Provider } from 'react-redux'

const app = (
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Main}>
				<IndexRoute component={Landing} />
				<Route path="/survey" component={PetInsuranceSurvey} />
					<Route path="/survey-1" component={Questionnaire1} />
					<Route path="/survey-2" component={Questionnaire2} />
					<Route path="/survey-3" component={Questionnaire3} />
					<Route path="/survey-results" component={InsuranceResults} />
					<Route path="/survey-result" component={InsuranceDetail} />
				<Route path="/profile" component={UserProfile} />
				<Route path="/signup" component={UserCapture} />
				<Route path="/adoption" component={PetAdoptionSurvey} />
			</Route>
		</Router>
	</Provider>
)

ReactDOM.render(app, document.getElementById('app'))
