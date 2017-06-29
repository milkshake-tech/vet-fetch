import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import store from '../../stores/store'
import APIManager from '../../utils/APIManager'
import { receivedUser } from '../actions/actions'
import { toggleLoginModal, toggleSignupModal } from '../actions/actions'

class UserCapture extends Component {

	constructor(props){
		super(props)
		this.captureUserInput = this.captureUserInput.bind(this)
		this.closeSignupModal = this.closeSignupModal.bind(this)
		this.openLoginModal = this.openLoginModal.bind(this)
		this.postUser = this.postUser.bind(this)
		this.state = {
			user: null,
			displayErrorAlert: false,
			errorMsg: null
		}
	}

	captureUserInput(event){
		const id = event.target.id
		const value = event.target.value
		let userCapture = Object.assign({}, this.state.user)
		userCapture[id] = value
		this.setState({ user: userCapture })
	}

	closeSignupModal(event){
		return this.props.toggleSignup(false)
	}

	openLoginModal(event){
		this.props.toggleSignup(false)
		return this.props.toggleLogin(true)
	}

	postUser(event){
		let newUser = Object.assign({}, this.state.user)

		if (newUser.email === undefined || newUser.phone === undefined || newUser.password === undefined || newUser.confirmPassword === undefined) return this.setState({displayErrorAlert: true, errorMsg: 'Oops! Looks like some information is missing. Please fill out all fields to sign up.' })
		if (newUser.password !== newUser.confirmPassword) return this.setState({displayErrorAlert: true, errorMsg: 'Oops, your password entries don\'t match. Please try again.' })

		let _this = this
		APIManager.handlePost('/api/user', newUser, (err, res) => {
			if(err) return alert(err)

			if (res.confirmation === 'Fail') return this.setState({displayErrorAlert: true, errorMsg: 'Oops, something went wrong saving your information. Please try again later.'})

			if(res.confirmation === 'Success'){
				_this.props.captureCurrentUser(res.result)
				_this.props.toggleSignup(false)
				return browserHistory.push('/profile')
			}
		})
	}

	render(){
		let {displayErrorAlert, errorMsg} = this.state
		let errorAlertDisplay = displayErrorAlert === true ? 'block' : 'none'
		let modalDisplay = this.props.displaySignUpModal ? 'block' : 'none'

		return(
			<div className='modal' style={{display: modalDisplay}} >
				<div className='modal-wrapper' >
					<div className='modal-content'>
							<div className='modal-close-btn' onClick={this.closeSignupModal}>x</div>
							<h2>Sign Up</h2>
							<h5>Create an account to save your pet records and bookmark veterinarians.</h5>
							<div style={{display: errorAlertDisplay, margin:2+'em'}}>{errorMsg}</div>

							<input id="email" onChange={ this.captureUserInput } placeholder="Email" className="signup-input" style={ localStyle.inputWidth } type="text"/>
							<input id="phone" onChange={ this.captureUserInput } placeholder="Telephone" className="signup-input" style={ localStyle.inputWidth } type="text"/>
							<input id="password" onChange={ this.captureUserInput } placeholder="Password" className="signup-input" style={ localStyle.inputWidth } type="password"/>
							<input id="confirmPassword" onChange={ this.captureUserInput } placeholder="Confirm Password" className="signup-input" style={ localStyle.inputWidth } type="password"/>

							<div onClick={ this.postUser } className="button">Submit</div>
							<h5 style={{marginTop: 1+'em'}}>Already have an account? Login <a onClick={this.openLoginModal} style={{cursor: 'pointer'}}>here</a></h5>
					</div>
					</div>
			</div>
		)
	}
}

const localStyle = {
	inputWidth: {
		width: 350+'px'
	}
}

const stateToProps = (state) => ({
	user: state.userReducer.user,
	displaySignUpModal: state.userReducer.displaySignUpModal
})

const dispatchToProps = (dispatch) => ({
	captureCurrentUser: (user) => dispatch(receivedUser(user)),
	toggleLogin: (toggleState) => dispatch(toggleLoginModal(toggleState)),
	toggleSignup: (toggleState) => dispatch(toggleSignupModal(toggleState))
})

export default connect (stateToProps, dispatchToProps)(UserCapture)
