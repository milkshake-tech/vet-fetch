import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

class PetInsuranceSurvey extends Component {

	constructor(props){
		super(props)
	}

	componentDidMount(){
		console.log("PetInsuranceSurvey componentDidMount")
	}

	render(){
		return(
			<div>
				<article id="work" className="panel secondary">
					<div className="image">
						<img src="/images/survey.png" alt="" data-position="center center" />
					</div>
					<div className="content">
						<ul className="actions spinX">
							<li><Link to="/" className="button small back">Back</Link></li>
						</ul>
						<div className="inner">
							<header>
								<h2>Complete pet survey</h2>
								<p>Answer a few questions about your pet so our team can give you the best insurance options.</p>
							</header>
							<Link to="/survey-1" className="button">Get Started</Link>
						</div>
					</div>
				</article>
			</div>
		)
	}
}

export default PetInsuranceSurvey
