import React, { Component } from 'react'
import navigation from '../utils/navigation'
import store from '../stores/store'
import actions from '../actions/actions'
import PetHealthRecord from '../components/PetHealthRecord'
import PetStats from '../components/PetStats'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

class PetProfileInfo extends Component {
	constructor(props, context){
		super(props, context)

	}

	render(){
		const petSlug = this.props.slug
		const petProfile = this.props.pets[petSlug] || {}


		return(
			<div>
				<Nav />
				<section id="page-title">
		            <div className="container clearfix">
		                <h1>Pet Dashboard</h1>
		            </div>
        		</section>
				<PetStats pets={this.props.pets} slug={this.props.slug}showHealthRecord={this.props.showHealthRecord} /> 
				
				<Footer />
			</div>
		)
	}

}

export default PetProfileInfo