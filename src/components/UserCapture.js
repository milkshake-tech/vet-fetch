import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import store from '../stores/store'
import actions from '../actions/actions'
import APIManager from '../utils/APIManager'

class UserCapture extends Component {

	constructor(props){
		super(props)
		this.captureUserInput = this.captureUserInput.bind(this)
		this.saveUser = this.saveUser.bind(this)
		this.saveUserPet = this.saveUserPet.bind(this)
		this.state = {
			opacitySetting: 0,
			user: null,
			displayErrorAlert: false,
			displaySuccessAlert: false
		}
	}

	componentDidMount(){
		this.setState({opacitySetting: 1})
	}

	captureUserInput(event){
		var userCapture = Object.assign({}, this.state.user)
		userCapture[event.target.id] = event.target.value
		this.setState({user: userCapture})
	}

	saveUser(event){
		let saveUser = Object.assign({}, this.state.user)
		if (saveUser.password === saveUser.confirmPassword){
			delete saveUser.confirmPassword
		}
		else {
			this.setState({displayErrorAlert: true})
			return
		}

		let _this = this
		APIManager.handlePost("/api/user", saveUser, function(err, response){
			if(err) return alert(err)
			if (response.confirmation === 'Fail') return alert(JSON.stringify(response))

			if (response.confirmation === "Success") {
				return _this.saveUserPet(response.result.id)
			}
		})
	}

	saveUserPet(userID){
		console.log('Line 56 USER ID for pet profile: '+JSON.stringify(userID))
		let newPetProfile = Object.assign({}, this.props.petProfile)
		newPetProfile['ownerID'] = userID
		console.log('Line 58 petProfile: '+JSON.stringify(newPetProfile))

		let _this = this
		APIManager.handlePost("/api/pet", newPetProfile, function(err, response){
			if(err) return alert(err)
			console.log("POST PET ERR: "+JSON.stringify(err))

			console.log("POST PET RESPONSE: "+JSON.stringify(response))
			if (response.confirmation === 'Fail') return alert(JSON.stringify(response))

			if (response.confirmation === "Success") {
				return _this.setState({displaySuccessAlert: true})
			}
		})

	}

	render(){
		var {opacitySetting, displayErrorAlert, displaySuccessAlert} = this.state
		var errorAlertDisplay = displayErrorAlert == true ? "block" : "none"
		var successAlertDisplay = displaySuccessAlert == true ? "block" : "none"

		return(
			<div className='jumbotron' style={{opacity: opacitySetting, transitionProperty: "opacity", transitionDuration: "1s"}}>
				<div style={{display:'flex', justifyContent: 'space-around'}}>

					<div className='leftPanel'>
						<Link to="/thankyou" className="button small back">Back</Link>
						<img src="/assets/images/flamingo.png" style={{display: 'block', marginTop:4+'em', marginLeft:'auto', marginRight:'auto'}} />
					</div>

					<div style={{width:600+'px'}}>
							<h2 style={{margin: "25px"}}>Sign Up</h2>

							<p><input id="email" onChange={this.captureUserInput} style={{borderRight:"none", borderLeft:"none", borderTop:"none", fontSize:"20px", width:"350px"}} placeholder="Email" className="col-md-3" type="text"/></p>
							<p><input id="phone" onChange={this.captureUserInput} style={{borderRight:"none", borderLeft:"none", borderTop:"none", fontSize:"20px", width:"250px"}} placeholder="Telephone" className="col-md-3" type="text"/></p>
							<p><input id="password" onChange={this.captureUserInput} style={{borderRight:"none", borderLeft:"none", borderTop:"none", fontSize:"20px", width:"250px"}} placeholder="Password" className="col-md-3" type="password"/></p>
							<p><input id="confirmPassword" onChange={this.captureUserInput} style={{borderRight:"none", borderLeft:"none", borderTop:"none", fontSize:"20px", width:"250px"}} placeholder="Confirm Password" className="col-md-3" type="password"/></p>

							<Link onClick={this.saveUser} style={{margin: "20px"}} className="button">Submit</Link>
							<div style={{display: errorAlertDisplay}}> "Oops, your password entries don't match. Please try again." </div>
							<div style={{display: successAlertDisplay}}> Thanks for signing up. Check out your <Link to="/profile"> profile.</Link> </div>
					</div>

				</div>
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		petProfile: state.petReducer.petProfile
	}
}

export default connect (stateToProps)(UserCapture)
