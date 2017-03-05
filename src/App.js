import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import Main from './components/Main'
import {FindVet, Landing, InsuranceDetail, InsuranceResults, PetAdoptionSurvey, PetInsuranceSurvey, Questionnaire1, Questionnaire2, Questionnaire3, UserCapture, UserProfile, VetHome, VetPortal, VetQuestionnaire1, VetQuestionnaire2, VetQuestionnaire3} from './components'
import store from './stores/store'
import { Provider } from 'react-redux'

const app = (
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Main}>
				<IndexRoute component={Landing} />
				<Route path="/findvet" component={FindVet} />
				<Route path="/survey" component={PetInsuranceSurvey} />
					<Route path="/survey-1" component={Questionnaire1} />
					<Route path="/survey-2" component={Questionnaire2} />
					<Route path="/survey-3" component={Questionnaire3} />
					<Route path="/survey-results" component={InsuranceResults} />
					<Route path="/survey-result" component={InsuranceDetail} />
				<Route path="/profile" component={UserProfile} />
				<Route path="/signup" component={UserCapture} />
				<Route path="/adoption" component={PetAdoptionSurvey} />
				<Route path="/vet-home" component={VetHome} />
				<Route path="/vet-portal" component={VetPortal} />
				<Route path="/vet-survey-1" component={VetQuestionnaire1} />
				<Route path="/vet-survey-2" component={VetQuestionnaire2} />
				<Route path="/vet-survey-3" component={VetQuestionnaire3} />
			</Route>
		</Router>
	</Provider>
)

ReactDOM.render(app, document.getElementById('app'))
