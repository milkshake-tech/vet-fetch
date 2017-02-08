import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

class PetAdoptionSurvey extends Component {

	constructor(props){
		super(props)
	}

	componentDidMount(){
		console.log("PetAdoptionSurvey componentDidMount")
	}

	render(){
		return(
			<div>
				<article className="panel secondary">
					<div className="image">
						<img src="/images/pic01vetFetch.png" alt="" data-position="center center" />
					</div>
					<div className="content">
						<ul className="actions spinX">
							<li><Link to="/" className="button small back">Back</Link></li>
						</ul>
						<div className="inner">
							<header>
								<h2>Coming Soon</h2>
								<p>Answer a few questions about your lifestyle so our team can help you find your ideal pet match.</p>
							</header>
						</div>
					</div>
				</article>
			</div>
		)
	}
}

export default PetAdoptionSurvey
