import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

class UserCapture extends Component {

	constructor(props){
		super(props)
		this.state = {
			opacitySetting: 0
		}
	}

	componentDidMount(){
		this.setState({opacitySetting: 1})
	}

	render(){
		var {opacitySetting} = this.state
		return(
			<div>
				<article id="work" className="panel secondary" style={{opacity: opacitySetting, transitionProperty: "opacity", transitionDuration: "1s"}}>
					<div className="image">
						<img src="/images/flamingo.png" alt="" data-position="center center" />
					</div>
					<div className="content">
						<ul className="actions spinX">
							<li><Link to="/survey-results" className="button small back">Back</Link></li>
						</ul>
						<div className="inner">
							<header>
								<h2>Sign Up</h2>
							</header>
							<p><input style={{borderRight:"none", borderLeft:"none", borderTop:"none", fontSize:"20px", width:"350px"}} placeholder="Email" className="col-md-3" type="text"/></p>
							<p><input style={{borderRight:"none", borderLeft:"none", borderTop:"none", fontSize:"20px", width:"250px"}} placeholder="Number" className="col-md-3" type="text"/></p>
							<p><input style={{borderRight:"none", borderLeft:"none", borderTop:"none", fontSize:"20px", width:"250px"}} placeholder="Password" className="col-md-3" type="password"/></p>
							<p><input style={{borderRight:"none", borderLeft:"none", borderTop:"none", fontSize:"20px", width:"250px"}} placeholder="Confirm Password" className="col-md-3" type="password"/></p>

							<Link to="/" style={{margin: "20px"}} className="button">Submit</Link>
						</div>
					</div>
				</article>
			</div>
		)
	}
}

export default UserCapture
