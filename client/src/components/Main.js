import React, { Component } from 'react'
import { Footer, Header } from '../components'

class Main extends Component {
	constructor(props, context){
		super(props, context)
	}

	render() {
		return (
			<div>
				<Header />
				{this.props.children}
				<Footer />
			</div>
		)
	}
}


export default Main
