import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import store from '../stores/store'
import { connect } from 'react-redux'
import {capturePetSurvey} from '../actions/actions'

class Questionnaire1 extends Component {

	constructor(props){
		super(props)
		this.captureResponse = this.captureResponse.bind(this)
		this.petTypeSelected = this.petTypeSelected.bind(this)
		this.state = {
			displaySelectionCheck: {
				dog: false,
				cat: false,
			},
			opacitySetting: 0
		}
	}

	componentDidMount(){
		this.setState({opacitySetting: 1})
	}

	captureResponse(event){
		let response = Object.assign({}, this.props.petProfile)
		response[event.target.id] = event.target.value
		this.props.capturePetSurveyResponse(response)
	}

	petTypeSelected(event){
		var displaySelection = Object.assign({}, this.state.displaySelectionCheck)
		displaySelection[event.target.id] = !displaySelection[event.target.id]
		this.setState({displaySelectionCheck: displaySelection})
		this.props.capturePetSurveyResponse(displaySelection)
	}

	render(){
		var {displaySelectionCheck, opacitySetting} = this.state

		var catImgDisplay = displaySelectionCheck.dog === true ? "none" : "inline"
		var dogImgDisplay = displaySelectionCheck.cat === true ? "none" : "inline"
		var displayNameCapture = (displaySelectionCheck.dog === true || displaySelectionCheck.cat === true) ? 'block' : 'none'
		return(
			<div className='jumbotron' style={{opacity: opacitySetting, transitionProperty: "opacity", transitionDuration: "1s"}}>
				<div style={{display:'flex', justifyContent: 'space-around'}}>

					<div className='leftPanel'>
						<Link to="/searchresults" className="button small back">Back</Link>

						<div style={{marginTop:2+'em'}}>
							<h2 style={{textAlign:'center'}}>Pick your pet</h2>
							<div style={{textAlign:'center'}}>
								<a onClick={this.petTypeSelected} style={{borderBottom: "none", padding: '10px', cursor:"pointer"}}><img style={{margin:"20px", display:dogImgDisplay}} id="dog" src="/assets/images/dog2.png" data-position="center center" /></a>
								<a onClick={this.petTypeSelected} style={{borderBottom: "none", padding: '10px', cursor:"pointer"}}><img style={{margin:"20px", display:catImgDisplay}} id="cat" src="/assets/images/cat2.png" data-position="center center" /></a>
							</div>
							<div style={{display: displayNameCapture, textAlign:'center'}}>
								<h2>Name</h2>
								<p style={{margin: "10px"}}><input style={{margin:"auto", borderRight:"none", borderLeft:"none", borderTop:"none", display: 'inline', fontSize:"25px", width:"250px"}} type="text" placeholder='Fido' onChange={this.captureResponse} id='name'/></p>
							</div>
						</div>

					</div>

					<div style={{marginTop:4.5+'em'}}>
						<div style={{display: 'flex', justifyContent: 'space-around'}}>
							<div style={{textAlign:'center'}}>
								<h2>Birthday</h2>
								<p style={{margin: "10px"}}><input style={{margin:"auto", borderRight:"none", borderLeft:"none", borderTop:"none", fontSize:"25px", width:"250px"}} type="text" placeholder='MM/DD/YYYY' onChange={this.captureResponse} id='birthday'/></p>
							</div>

							<div style={{textAlign:'center'}}>
								<h2>Sex</h2>
								<p style={{margin: "10px"}}>
									<select style={{margin:"auto", borderRight:"none", borderLeft:"none", borderTop:"none", color: '#bbb', fontSize:"25px", width:"180px"}} type="text" onChange={this.captureResponse} id='sex' defaultValue='Select sex'>
										<option disabled>Select sex</option>
										<option>Female</option>
										<option>Male</option>
									</select>
									</p>
							</div>

						</div>

						<Link to="/survey-2" style={{margin:"40px", float:'right'}} className="button">Next</Link>
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

export default connect(stateToProps, dispatchToProps)(Questionnaire1)
