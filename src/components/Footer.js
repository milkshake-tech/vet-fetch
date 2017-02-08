import React, { Component } from 'react'

class Footer extends Component {

	constructor(props, context){
		super(props, context)
	}

	render() {

		return (
				<footer id="footer">
					<p className="copyright">&copy; Vet Fetch</p>
				</footer>
		)
	}
}

export default Footer
