import React, { Component } from 'react'

class Footer extends Component {

	constructor(props, context){
		super(props, context)
	}

	render() {

		return (
			<footer className="footer">
				<div style={{textAlign: 'center'}}>
					<img src="/assets/images/vetFetch_white_sm.png" />
					<p>&copy; vetFetch 2017</p>
				</div>
				<div style={{textShadow: '1px 1px 2px black'}}>
					<p style={{cursor:'pointer'}}>About</p>
					<p style={{cursor:'pointer'}}>FAQ</p>
					<p style={{cursor:'pointer'}}>Privacy Policy</p>
				</div>
				<div style={{textShadow: '1px 1px 2px black'}}>
					<p>Follow Us</p>
					<div>
						<a href='https://www.instagram.com/milkshakenyc/' style={{border:'none'}}><img src="/assets/images/instagram_white.png" style={{marginRight: 1+'em'}} /></a>
						<a href='https://www.facebook.com/' style={{border:'none'}}><img src="/assets/images/facebook_white.png" style={{marginRight: 1+'em'}}/></a>
						<a href='https://twitter.com/milkshakeTech' style={{border:'none'}}><img src="/assets/images/twitter_white.png" /></a>
					</div>
				</div>
			</footer>
		)
	}
}

export default Footer
