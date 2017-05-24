import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import store from '../../stores/store'
import APIManager from '../../utils/APIManager'

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
			displaySuccessAlert: false,
			errorMsg: null
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
		let petProfile = Object.assign({}, this.props.petProfile)
		this.setState({displayErrorAlert: false})

		if (saveUser.email === undefined || saveUser.phone === undefined || saveUser.password === undefined || saveUser.confirmPassword === undefined) return this.setState({displayErrorAlert: true, errorMsg: 'Oops! Looks like some information is missing. Please fill out all fields to sign up.' })
		if (saveUser.password !== saveUser.confirmPassword) return this.setState({displayErrorAlert: true, errorMsg: "Oops, your password entries don't match. Please try again." })

		let _this = this
		APIManager.handlePost("/api/user", saveUser, function(err, response){
			if(err) return alert(err)
			if (response.confirmation === 'Fail') return alert(JSON.stringify(response))

			if (response.confirmation === "Success" && petProfile.name !== undefined) {
				return _this.saveUserPet(response.result.id)
			}
			if (response.confirmation === 'Success' && petProfile.name === undefined){
				return _this.setState({displaySuccessAlert: true})
			}
		})
	}

	saveUserPet(userID){
		let newPetProfile = Object.assign({}, this.props.petProfile)
		newPetProfile['ownerID'] = userID

		let _this = this
		APIManager.handlePost("/api/pet", newPetProfile, function(err, response){
			if(err) return alert(err)

			if (response.confirmation === 'Fail') return alert(JSON.stringify(response))

			if (response.confirmation === "Success") {
				return _this.setState({displaySuccessAlert: true})
			}
		})
	}

	render(){
		var {opacitySetting, displayErrorAlert, displaySuccessAlert, errorMsg} = this.state
		var errorAlertDisplay = displayErrorAlert == true ? "block" : "none"
		var successAlertDisplay = displaySuccessAlert == true ? "block" : "none"

		return(
			<div className='jumbotron' style={{opacity: opacitySetting, transitionProperty: "opacity", transitionDuration: "1s"}}>

				<div style={{display:'flex', justifyContent: 'space-around'}}>

					<div className='leftPanel'>
						<img src='/assets/images/flamingo.png' className='signUpImg' />
					</div>

					<div style={{width:600+'px', textAlign:'center'}}>
							<h2 style={{margin:25+'px'}}>Sign Up</h2>

							<div style={{display: errorAlertDisplay, margin:2+'em'}}>{errorMsg}</div>
							<div style={{display: successAlertDisplay, margin:2+'em'}}> Thanks for signing up. Check out your <Link to="/profile"> profile.</Link> </div>

							<p><input id="email" onChange={this.captureUserInput} style={{borderRight:"none", borderLeft:"none", borderTop:"none", fontSize:"20px", margin: 'auto', width:"350px"}} placeholder="Email" className="col-md-3" type="text"/></p>
							<p><input id="phone" onChange={this.captureUserInput} style={{borderRight:"none", borderLeft:"none", borderTop:"none", fontSize:"20px", margin: 'auto', width:"350px"}} placeholder="Telephone" className="col-md-3" type="text"/></p>
							<p><input id="password" onChange={this.captureUserInput} style={{borderRight:"none", borderLeft:"none", borderTop:"none", fontSize:"20px", margin: 'auto', width:"350px"}} placeholder="Password" className="col-md-3" type="password"/></p>
							<p><input id="confirmPassword" onChange={this.captureUserInput} style={{borderRight:"none", borderLeft:"none", borderTop:"none", fontSize:"20px", margin: 'auto', width:"350px"}} placeholder="Confirm Password" className="col-md-3" type="password"/></p>

							<div onClick={this.saveUser} className="button">Submit</div>
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
