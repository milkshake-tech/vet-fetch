import React, { Component } from 'react'
import api from '../utils/api'
import navigation from '../utils/navigation'
import store from '../stores/store'
import actions from '../actions/actions'
import TopBar from '../components/TopBar'
import Nav from '../components/Nav'
import Footer from '../components/Footer'


class RegisterPet extends Component {

	constructor(props, context){
		super(props, context)
		this.capturePetInformation = this.capturePetInformation.bind(this)
		this.registerPet = this.registerPet.bind(this)
		this.state = {
			registerPet: {
				name: '',
				species: '',
				ownerId: null,
				slug: null
			}
		}
	}

	capturePetInformation(event){
		var registerPet = Object.assign({}, this.state.registerPet)
		registerPet[event.target.id] = event.target.value
		registerPet['ownerId'] = this.props.currentUser.id
		this.setState({
			registerPet: registerPet
		})
	}

	registerPet(event){
		event.preventDefault()

		var loggedIn = this.props.currentUser || {}
		console.log('REGISTER PET: currentUser '+JSON.stringify(loggedIn))

		if (loggedIn.id == null){
			alert("Please login or register to save your pets")
		}

		api.handlePost('/api/pet', this.state.registerPet, function(err, response){
			if (err){
				alert(err.message)
				return
			}
			console.log(JSON.stringify(response.result))
			store.dispatch(actions.registerPet(response.result))
		})

	}

	render(){
		return(
			<section className="full-screen dark">
				<div className="post-grid grid-2 clearfix">
					<div className="entry clearfix">
							<input onChange={this.capturePetInformation} id="name" type="text" className="form-control input-lg not-dark"  placeholder="Pet Name"/> <br />
							<input onChange={this.capturePetInformation} id="species" type="email" className="form-control input-lg not-dark" placeholder="Species"/> <br />
							<button onClick={this.registerPet} className="btn nomargin">Register</button>
					</div>
					<div className="entry clearfix">
						<div className="entry-image" style={{background: 'url("/images/desk.jpg") center', opacity: 0.4, overflow:'visible'}}>
						</div>
					</div>
				</div>
			</section>
		)
	}
}

export default RegisterPet
