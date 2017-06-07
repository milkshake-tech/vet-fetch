import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import store from '../../stores/store'
import APIManager from '../../utils/APIManager'
import { receivedUser } from '../actions/actions'

class UserCapture extends Component {

	constructor(props){
		super(props)
		this.captureUserInput = this.captureUserInput.bind(this)
		this.postUser = this.postUser.bind(this)
		this.state = {
			opacitySetting: 0,
			user: null,
			displayErrorAlert: false,
			errorMsg: null
		}
	}

	componentDidMount(){
		setTimeout(() => {
				this.setState({opacitySetting: 1})
		}, 100)
	}

	captureUserInput(event){
		const id = event.target.id
		const value = event.target.value
		let userCapture = Object.assign({}, this.state.user)
		userCapture[id] = value
		this.setState({ user: userCapture })
	}

	postUser(event){
		let newUser = Object.assign({}, this.state.user)

		if (newUser.email === undefined || newUser.phone === undefined || newUser.password === undefined || newUser.confirmPassword === undefined) return this.setState({displayErrorAlert: true, errorMsg: 'Oops! Looks like some information is missing. Please fill out all fields to sign up.' })
		if (newUser.password !== newUser.confirmPassword) return this.setState({displayErrorAlert: true, errorMsg: 'Oops, your password entries don\'t match. Please try again.' })

		let _this = this
		APIManager.handlePost('/api/user', newUser, (err, res) => {
			if(err) return alert(err)

			if (res.confirmation === 'Fail') return alert(JSON.stringify(response))

			if(res.confirmation === 'Success'){
				_this.props.captureCurrentUser(res.result)
				return browserHistory.push('/profile')
			}
		})
	}

	render(){
		let {opacitySetting, displayErrorAlert, errorMsg} = this.state
		let errorAlertDisplay = displayErrorAlert === true ? 'block' : 'none'

		return(
			<div className='jumbotron' style={{opacity: opacitySetting}}>
				<div className='jumbotron-container'>
					<div className='left-panel'>
						<img src='/assets/images/flamingo.png' className='signUp-img' />
					</div>

					<div className='right-panel'>
							<h2>Sign Up</h2>
							<div style={{display: errorAlertDisplay, margin:2+'em'}}>{errorMsg}</div>

							<input id="email" onChange={ this.captureUserInput } placeholder="Email" className="signUp-input" style={ localStyle.inputWidth } type="text"/>
							<input id="phone" onChange={ this.captureUserInput } placeholder="Telephone" className="signUp-input" style={ localStyle.inputWidth } type="text"/>
							<input id="password" onChange={ this.captureUserInput } placeholder="Password" className="signUp-input" style={ localStyle.inputWidth } type="password"/>
							<input id="confirmPassword" onChange={ this.captureUserInput } placeholder="Confirm Password" className="signUp-input" style={ localStyle.inputWidth } type="password"/>

							<div onClick={ this.postUser } className="button">Submit</div>
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
})

const dispatchToProps = (dispatch) => ({
	captureCurrentUser: (user) => dispatch(receivedUser(user))
})

export default connect (stateToProps, dispatchToProps)(UserCapture)
