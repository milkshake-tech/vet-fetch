import React, { Component } from 'react'

class Header extends Component {

	constructor(props, context){
		super(props, context)
	}

	render() {

		return (
			<div className="header">
        <div style={{marginLeft:6+'em'}}>
          Home
        </div>
        <div style={{marginRight:6+'em'}}>
          Get help
        </div>
      </div>
		)
	}
}

export default Header
