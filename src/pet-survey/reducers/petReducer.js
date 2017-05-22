import constants from '../constants/constants'

var initialState = {
	petProfile: {}
}

export default function(state = initialState, action){
	let newState = Object.assign({}, state)

	switch(action.type){
		case constants.CAPTURE_PET_SURVEY:
			newState['petProfile'] = action.petProfile
			return newState

		default:
			return state
	}
}
