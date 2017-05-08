import React, { Component } from 'react'

class Header extends Component {

	constructor(props, context){
		super(props, context)
	}

	render() {

		return (
			<div className="header">
        <div>
          Home
        </div>
        <div>
          Get help
        </div>
      </div>
		)
	}
}

export default Header
