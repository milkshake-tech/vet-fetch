import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

class InsuranceResults extends Component {

	constructor(props){
		super(props)
	}

	componentDidMount(){
		console.log("Questionnaire2 componentDidMount")
	}

	render(){
		return(
			<div>
				<article id="work" className="panel secondary">
					<div className="image">
						<img src="/images/sittingdog.png" alt="" data-position="center center" />
					</div>
					<div className="content">
						<ul className="actions spinX">
							<li><Link to="/survey-3" className="button small back">Back</Link></li>
						</ul>
						<div className="inner">
							<header>
								<h2>Insurance Plan Suggestions</h2>
							</header>
							<p>Plans for you</p>
							<Link to="/signup" className="button">Save for Later</Link>
						</div>
					</div>
				</article>
			</div>
		)
	}
}

export default InsuranceResults
