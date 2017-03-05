import constants from '../constants/constants'

var initialState = {
	left: false
}

export default (state = initialState, action) => {
	let newState = Object.assign({}, state)

	switch(action.type){
		case constants.RECEIVE_SIDEMENU_STATE:
			newState["left"] = action.left
			return newState

		default:
			return state
	}
}
