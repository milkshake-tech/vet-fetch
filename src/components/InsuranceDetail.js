import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import InsurancePlans from '../utils/InsurancePlans'

class InsuranceDetail extends Component {

	constructor(props){
		super(props)
		this.insuranceResults = InsurancePlans
		this.state = {
			opacitySetting: 0
		}
	}

	componentDidMount(){
		this.setState({opacitySetting: 1})
	}

	render(){
		var {opacitySetting} = this.state
		var plan = this.props.location.state.plan

		return(
			<div>
				<article id="work" className="panel secondary" style={{opacity: opacitySetting, transitionProperty: "opacity", transitionDuration: "1.25s"}}>
					<div className="image">
						<img src="/images/sittingdog.png" alt="" data-position="center center" />
					</div>
					<div className="content">
						<ul className="actions spinX">
							<li><Link to="/survey-results" className="button small back">Back</Link></li>
						</ul>
						<div className="inner">
							<header>
								<h2>{plan.company}</h2>
							</header>
							<p>Plan: {plan.plan}</p>
							<p>Cost: ${plan.premium}/month </p>
							<p>Deductible: ${plan.deductible} </p>
							<p>Visit: <a href={plan.website}>{plan.website}</a> </p>
							<Link to="/signup" style={{margin: "25px"}} className="button">Save for Later</Link>
						</div>
					</div>
				</article>
			</div>
		)
	}
}

export default InsuranceDetail
