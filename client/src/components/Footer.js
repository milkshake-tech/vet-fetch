import React, { Component } from 'react'

const Footer = () => (
	<footer className="footer">
		<div style={{textAlign: 'center'}}>
			<img src="/assets/images/vetFetch_white_sm.png" />
			<p>&copy; vetFetch 2017</p>
		</div>
		<div>
			<p>About</p>
			<p>FAQ</p>
			<p>Privacy Policy</p>
		</div>
		<div>
			<p>Follow Us</p>
			<div>
				<a href='https://www.instagram.com/milkshakenyc/'><img src="/assets/images/instagram_white.png" style={{marginRight: 1+'em'}} /></a>
				<a href='https://www.facebook.com/'><img src="/assets/images/facebook_white.png" style={{marginRight: 1+'em'}}/></a>
				<a href='https://twitter.com/milkshakeTech'><img src="/assets/images/twitter_white.png" /></a>
			</div>
		</div>
	</footer>
)

export default Footer
