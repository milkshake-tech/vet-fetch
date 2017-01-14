import React, { Component } from 'react'
import LandingSignUp from '../components/LandingSignUp'
import TopBar from '../components/TopBar'
import Footer from '../components/Footer'
import RegisterPet from '../components/RegisterPet'

class Landing extends Component {

	constructor(props){
		super(props)
	}

	render(){
		return(
			<div>
    		<TopBar />
	        <section className="full-screen dark" style={{background: 'url("/images/landing/cover.jpg") center', opacity: 0.6, overflow:'visible'}}>
	            <div className="container vertical-middle clearfix">
	                <div className="heading-block title-center nobottomborder">
	                    <h1 style={{opacity: 1}}>All your pet health information in one place.</h1>
	                </div>
	            </div>
	        </section>
				<RegisterPet />
			</div>
		)
	}
}

export default Landing
