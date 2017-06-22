import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import store from '../../stores/store'
import { receivedPets, receivedUser } from '../actions/actions'
import APIManager from '../../utils/APIManager'
import { PetProfileRow } from '../components'

class UserProfile extends Component {

	constructor(props){
		super(props)
		this.fetchPets = this.fetchPets.bind(this)
		this.logout = this.logout.bind(this)
		this.state = {
			opacitySetting: 0
		}
	}

	componentDidMount(){
		this.setState({opacitySetting: 1})
		this.fetchPets(this.props.user.id)
	}

	fetchPets(userID){
		let _this = this
		APIManager.handleGet('/api/pet', {ownerID: userID}, (err, response) => {
			if (err) return	alert(JSON.stringify(err))

			if (response.confirmation === "Fail") return browserHistory.push('/')

			if (response.confirmation === "Success") {
				_this.props.capturePets(response.results)
				return
			}
		})
	}

	logout(){
		let _this = this
		APIManager.handleGet('/logout', null, (err, response) => {
			if (response.confirmation === 'Fail') return alert(JSON.stringify(response))
			if (response.confirmation === 'Success') {
				 browserHistory.push('/')
				return _this.props.captureCurrentUser(null)
			}
		})
	}

	render(){
		let {opacitySetting} = this.state
		let {pets, user} = this.props
		let petResults

		if(pets === null){
			petResults = <h2>Nothing to see here</h2>
		} else {
			petResults = pets.map(function(result, i){
				return(
					<PetProfileRow key={i} pet={result} />
				)
			})
		}

		return(
			<div className='jumbotron' style={{opacity: opacitySetting, transitionProperty: "opacity", transitionDuration: "1s"}}>
				<div style={{margin:2+'em'}}><Link to="/" className="button small back" style={{marginLeft: 2+'em'}}>Search Veterinarians</Link></div>

				<div style={{display:'flex', justifyContent: 'space-around'}}>
					<div className='leftPanel' style={{textAlign:'center'}}>
						<h2>Profile</h2>
						<img src="/assets/images/email.png" style={{display:'inline', marginBottom:-.25+'em', marginRight:.5+'em'}}/>
						<p style={{display:'inline', fontSize:12+'px'}}>{user.email}</p>
						<button onClick={this.logout} style={{fontSize:8+'px', display:'block', margin:'1em auto'}}>Logout</button>
					</div>

					<div style={{width:600+'px', textAlign:'center'}}>
						<h2>Pets</h2>
						{petResults}
					</div>
				</div>
			</div>
		)
	}
}

const stateToProps = (state) => ({
	user: state.userReducer.user,
	pets: state.userReducer.pets
})

const dispatchToProps = (dispatch) => ({
	captureCurrentUser: (user) => dispatch(receivedUser(user)),
	capturePets: (pets) => dispatch(receivedPets(pets))
})

export default connect (stateToProps, dispatchToProps) (UserProfile)
