import React, { Component } from 'react'
import api from '../utils/api'
import TopBarLogin from '../components/TopBarLogin'
import TopBarSignUp from '../components/TopBarSignUp'

class TopBar extends Component {

	constructor(props, context){
		super(props, context)
	}

	render(){
		return(
		 <div id="top-bar">
        <div className="container clearfix">
            <div className="col_half nobottommargin">
                <div className="top-links">
                    <ul>
                        <li><a href="#">Sign Up</a>
                            <div className="top-link-section">
                                <TopBarSignUp />
                            </div>
                        </li>
                        <li><a href="#">Log In</a>
                            <div className="top-link-section">
                                <TopBarLogin />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
		)
	}
}

export default TopBar
