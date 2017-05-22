import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

class Header extends Component {

	constructor(props, context){
		super(props, context)
	}

	render() {

		return (
			<div className="header">
        <div style={{marginLeft:6+'em'}}>
          <Link to='/' style={{border: 'none'}}><img src="/assets/images/vetFetch_white_sm.png"/></Link>
        </div>
        <div style={{marginRight:6+'em'}}>
          <Link to='/signup' style={{border:'none'}}> Sign Up / Log In </Link>
        </div>
      </div>
		)
	}
}

export default Header
