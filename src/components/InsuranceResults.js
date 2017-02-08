import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import InsurancePlans from '../utils/InsurancePlans'

class InsuranceResults extends Component {

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
		var plansArray = this.insuranceResults.insurancePlans
		var insuranceResultsList = plansArray.map(function(result, i){
			return(
				<div key={i} style={{margin: "5px"}} className="button">
					<p style={{fontSize: '10px'}}>{result.company}: {result.plan} | ${result.premium}/month</p>
				</div>
			)
		})
		return(
			<div>
				<article id="work" className="panel secondary" style={{opacity: opacitySetting, transitionProperty: "opacity", transitionDuration: "1.25s"}}>
					<div className="image">
						<img src="/images/sittingdog.png" alt="" data-position="center center" />
					</div>
					<div className="content">
						<ul className="actions spinX">
							<li><Link to="/survey-3" className="button small back">Back</Link></li>
						</ul>
						<div className="inner">
							<header>
								<h2>Plans for you</h2>
							</header>
							{insuranceResultsList}
							<Link to="/signup" style={{margin: "25px"}} className="button">Save for Later</Link>
						</div>
					</div>
				</article>
			</div>
		)
	}
}

export default InsuranceResults
