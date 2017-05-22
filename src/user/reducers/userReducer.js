import constants from '../constants/constants'

var initialState = {
	user: {
		id: null,
		email: null,
		phone: null
	},
	pets: []
}

export default function(state = initialState, action){
	switch (action.type) {
		case constants.RECEIVED_USER:
			var newState = Object.assign({}, state)
			newState['user'] = action.user
			return newState

		case constants.RECEIVED_PETS:
			var newState = Object.assign({}, state)
			newState['pets'] = action.pets
			return newState

		default:
			return state
	}
}
