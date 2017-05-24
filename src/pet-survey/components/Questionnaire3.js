import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import store from '../../stores/store'
import { connect } from 'react-redux'
import {capturePetSurvey} from '../actions/actions'
import AutocompleteBar from '../components/AutocompleteBar'

class Questionnaire3 extends Component {

	constructor(props){
		super(props)
		this.conditionsList = ["Allergies", "Arthritis", "Cancer", "Diabetes", "Ear Infections", "Heart Disease", "Neutered or Spayed", "Orthopedic Conditions", "Skin Conditions", "Thyroid Conditions"]
		this.captureResponse = this.captureResponse.bind(this)
		this.highlightSelectedTile = this.highlightSelectedTile.bind(this)
		this.state = {
			highlight: false,
			highlightToggleState: {},
			opacitySetting: 0
				}
	}

	componentDidMount(){
		this.setState({opacitySetting: 1})
	}

	captureResponse(event){
		let response = Object.assign({}, this.props.petProfile)
		response['tags'] = this.state.highlightToggleState
		this.props.capturePetSurveyResponse(response)
		browserHistory.push('/thankyou')
	}

	highlightSelectedTile(event){
		var {highlightToggleState} = this.state
		var highlightToggle = Object.assign({}, highlightToggleState)

		if (highlightToggle[event.target.id] === null){
			highlightToggle[event.target.id] = true

			this.setState({highlight: true, highlightToggleState: highlightToggle})
			return
		}
		highlightToggle[event.target.id] = !this.state.highlight
		this.setState({highlight: !this.state.highlight, highlightToggleState: highlightToggle})
	}

	render(){
		var {highlightToggleState, opacitySetting} = this.state
		var highlightState = {}
		var highlightColor = ""

		for (var condition of this.conditionsList){
			var conditionName = condition
			if (highlightToggleState[conditionName] === true){
				highlightState[conditionName] = "lightgreen"
			}
		}

		var _this = this
		var conditionTile = this.conditionsList.map(function(condition, i){
			return(
					<div onClick={_this.highlightSelectedTile} key={i} id={condition} style={{margin: "10px", backgroundColor: highlightState[condition]}} className="button">
						{condition}
					</div>
				)
		  })

		return(
			<div className='jumbotron' style={{opacity: opacitySetting, transitionProperty: "opacity", transitionDuration: "1s"}}>
				<div style={{margin:2+'em'}}><Link to="/survey-2" className="button small back" style={{marginLeft: 2+'em'}}>Back</Link></div>

				<div style={{display:'flex', justifyContent: 'space-around'}}>
					<div className='leftPanel'>
						<img src="/assets/images/dog_boxer.png" style={{display: 'block', marginTop:4+'em', marginLeft:'auto', marginRight:'auto'}} />
					</div>

					<div style={{width:600+'px'}}>
						<h2 style={{margin: "25px"}}>Does your pet have a history of any of the following?</h2>
						<div style={{margin: 2+'em'}}>
							{conditionTile}
						</div>
						<div style={{textAlign:'center'}}>
							<div className="button" onClick={this.captureResponse}>Submit</div>
						</div>
					</div>
				</div>


			</div>
		)
	}
}

const stateToProps = (state) => ({
	petProfile: state.petReducer.petProfile
})

const dispatchToProps = (dispatch) => ({
	capturePetSurveyResponse: (petProfile) => dispatch(capturePetSurvey(petProfile))
})

export default connect(stateToProps, dispatchToProps)(Questionnaire3)
