import React, { Component } from 'react'

class Footer extends Component {

	constructor(props, context){
		super(props, context)
	}

	render() {

		return (
			<footer className="footer">
				<div style={{textAlign: 'center'}}>
					<img src="/assets/images/vetFetch_blue_sm.png" />
					<p>&copy; vetFetch 2017</p>
				</div>
				<div>
					<p>About</p>
					<p>FAQ</p>
					<p>Privacy Policy</p>
				</div>
				<div>
					<p>Follow Us</p>
					<div><img src="/assets/images/instagram.png" style={{marginRight: 1+'em'}} /><img src="/assets/images/facebook.png" style={{marginRight: 1+'em'}}/><img src="/assets/images/twitter.png" /></div>
				</div>
			</footer>
		)
	}
}

export default Footer
