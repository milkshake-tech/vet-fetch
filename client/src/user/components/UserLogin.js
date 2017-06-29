import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import store from '../../stores/store'
import APIManager from '../../utils/APIManager'
import { receivedUser } from '../actions/actions'
import { toggleLoginModal, toggleSignupModal } from '../actions/actions'

class UserLogin extends Component {

	constructor(props){
		super(props)
		this.captureUserInput = this.captureUserInput.bind(this)
		this.closeLoginModal = this.closeLoginModal.bind(this)
		this.loginUser = this.loginUser.bind(this)
		this.state = {
			userCapture: null,
			displayErrorAlert: false,
			errorMsg: null
		}
	}

	captureUserInput(event){
		const id = event.target.id
		const value = event.target.value
		let newUserCapture = Object.assign({}, this.state.userCapture)
		newUserCapture[id] = value
		this.setState({ userCapture: newUserCapture })
	}

	closeLoginModal(event){
		return this.props.toggleLogin(false)
	}

	loginUser(){
		let _this = this
		APIManager.handlePost('/login', this.state.userCapture, (err, res) => {
			if(err){
				return alert('Oops! Your email or password is incorrect.')
			}

			if (res.confirmation === 'Success') {
				_this.props.captureCurrentUser(res.result)
				_this.props.toggleLogin(false)
				browserHistory.push('/profile')
				return
			}
		})
	}

	render(){
		let {displayErrorAlert, errorMsg} = this.state
		let errorAlertDisplay = displayErrorAlert === true ? 'block' : 'none'
		let modalDisplay = this.props.displayLoginModal ? 'block' : 'none'

		return(
			<div className='modal' style={{display: modalDisplay}} >
				<div className='modal-wrapper' >
					<div className='modal-content'>
							<div className='modal-close-btn' onClick={this.closeLoginModal}>x</div>
							<h2>Log In</h2>
							<h5>Log in to save your pet records and bookmark veterinarians.</h5>
							<div style={{display: errorAlertDisplay, margin:2+'em'}}>{errorMsg}</div>

							<input id="email" onChange={ this.captureUserInput } placeholder="Email" className="signup-input" style={ localStyle.inputWidth } type="text"/>
							<input id="password" onChange={ this.captureUserInput } placeholder="Password" className="signup-input" style={ localStyle.inputWidth } type="password"/>

							<div onClick={ this.loginUser } className="button">Log In</div>
							<img src='/assets/images/corgi.png' className='login-img'/>
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
	displayLoginModal: state.userReducer.displayLoginModal
})

const dispatchToProps = (dispatch) => ({
	captureCurrentUser: (user) => dispatch(receivedUser(user)),
	toggleLogin: (toggleState) => dispatch(toggleLoginModal(toggleState)),
})

export default connect (stateToProps, dispatchToProps)(UserLogin)
