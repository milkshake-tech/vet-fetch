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
		var saveUser = Object.assign({}, this.state.user)
		var _this = this
		if (saveUser.password === saveUser.confirmPassword){
			delete saveUser.confirmPassword
		}
		else {
			this.setState({displayErrorAlert: true})
			return
		}

		APIManager.handlePost("/api/user", saveUser, function(err, response){
			if(err){
				alert(err)
				return
			}

			if (response.confirmation == "Success"){
				_this.setState({displaySuccessAlert: true})
				console.log("POST USER RESPONSE: "+JSON.stringify(response))

			}
			return
		})
	}

	render(){
		var {opacitySetting, displayErrorAlert, displaySuccessAlert} = this.state
		var errorAlertDisplay = displayErrorAlert == true ? "block" : "none"
		var successAlertDisplay = displaySuccessAlert == true ? "block" : "none"

		return(
			<div>
				<article id="work" className="panel secondary" style={{opacity: opacitySetting, transitionProperty: "opacity", transitionDuration: "1s"}}>
					<div className="image">
						<img src="/images/flamingo.png" alt="" data-position="center center" />
					</div>
					<div className="content">
						<ul className="actions spinX">
							<li><Link to="/survey-results" className="button small back">Back</Link></li>
						</ul>
						<div className="inner">
							<header>
								<h2>Sign Up</h2>
							</header>
							<p><input id="email" onChange={this.captureUserInput} style={{borderRight:"none", borderLeft:"none", borderTop:"none", fontSize:"20px", width:"350px"}} placeholder="Email" className="col-md-3" type="text"/></p>
							<p><input id="phone" onChange={this.captureUserInput} style={{borderRight:"none", borderLeft:"none", borderTop:"none", fontSize:"20px", width:"250px"}} placeholder="Number" className="col-md-3" type="text"/></p>
							<p><input id="password" onChange={this.captureUserInput} style={{borderRight:"none", borderLeft:"none", borderTop:"none", fontSize:"20px", width:"250px"}} placeholder="Password" className="col-md-3" type="password"/></p>
							<p><input id="confirmPassword" onChange={this.captureUserInput} style={{borderRight:"none", borderLeft:"none", borderTop:"none", fontSize:"20px", width:"250px"}} placeholder="Confirm Password" className="col-md-3" type="password"/></p>

							<Link onClick={this.saveUser} style={{margin: "20px"}} className="button">Submit</Link>
							<div style={{display: errorAlertDisplay}}> "Oops, your password entries don't match. Please try again." </div>
							<div style={{display: successAlertDisplay}}> Thanks for signing up. Check out your <Link to="/profile"> profile.</Link> </div>

						</div>
					</div>
				</article>
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		user: state.userReducer.user
	}
}

const dispatchToProps = (dispatch) => {
	return{
		captureUserForm: (user) => dispatch(actions.receivedUser(user))
	}
}

export default connect (stateToProps, dispatchToProps) (UserCapture)
