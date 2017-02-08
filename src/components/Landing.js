import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import store from '../stores/store'
import actions from '../actions/actions'
import { connect } from 'react-redux'


class Landing extends Component {

	constructor(props, context){
		super(props, context)
	}

	componentDidMount() {
	}

	render() {

		return (
			<div>
				<article id="home" className="panel special">
					<div className="image">
						<img src="/images/pic01vetFetch.png" alt="" data-position="center center" />
					</div>
					<div className="content">
						<div className="inner">
							<header>
								<h1>Vet Fetch</h1>
								<p>How can we help you?</p>
							</header>
							<nav id="nav">
								<ul className="actions vertical special spinY">
									<li>
										<Link to='/survey' className="button">Looking for pet insurance</Link>
									</li>
									<li>
										<Link to="/adoption" className="button">Looking for a pet</Link>
									</li>
								</ul>
							</nav>
						</div>
					</div>
				</article>
			</div>
		)
	}
}

const stateToProps = function(state) {

	return {
		currentUser: state.accountReducer.currentUser,
	}
}

export default connect (stateToProps)(Landing)
