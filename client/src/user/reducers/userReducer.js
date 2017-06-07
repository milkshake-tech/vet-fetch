import constants from '../constants/constants'

var initialState = {
	user: null,
	pets: null
}

export default function(state = initialState, action){
	let newState = Object.assign({}, state)

	switch (action.type) {
		case constants.RECEIVED_USER:
			newState['user'] = action.user
			return newState

		case constants.RECEIVED_PETS:
			newState['pets'] = action.pets
			return newState

		default:
			return state
	}
}
