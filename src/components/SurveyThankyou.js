import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import store from '../stores/store'
import { connect } from 'react-redux'
import AutocompleteBar from '../components/AutocompleteBar'

class Questionnaire3 extends Component {

	constructor(props){
		super(props)
		this.state = {
			opacitySetting: 0
		}
	}

	componentDidMount(){
		console.log('Line 15 petPROFILE: '+JSON.stringify(this.props.petProfile))
		//check for current user. If current user === true, display btn to profile page
		//if current user === null, display btn to create account
		this.setState({opacitySetting: 1})
	}

	render(){
		var {opacitySetting} = this.state
		var _this = this


		return(
			<div className='jumbotron' style={{opacity: opacitySetting, transitionProperty: "opacity", transitionDuration: "1s"}}>
				<div style={{display:'flex', justifyContent: 'space-around'}}>

					<div className='leftPanel'>
						<Link to="/survey-2" className="button small back">Back</Link>
						<img src="/assets/images/dogface.png" style={{display: 'block', marginTop:4+'em', marginLeft:'auto', marginRight:'auto'}} />
					</div>

					<div style={{width:600+'px'}}>
						<h2 style={{margin: "25px"}}>Thank you for taking our survey!</h2>

						<p style={{margin: "25px"}}>Create an account to access your pet profile and any bookmarked veterinarians.</p>
						<Link to='/signup' className='button' style={{margin: "25px"}}>Sign Up</Link>
					</div>

				</div>
			</div>
		)
	}
}

const stateToProps = (state) => ({
	petProfile: state.petReducer.petProfile
})

export default connect(stateToProps)(Questionnaire3)
