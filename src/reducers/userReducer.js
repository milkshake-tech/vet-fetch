import constants from '../constants/constants'

var initialState = {
	user: {
		id: null,
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
		password: ''
	}
}

export default function(state = initialState, action){
	switch (action.type) {
		case constants.RECEIVED_USER:
			var newState = Object.assign({}, state)
			newState['user'] = action.user
			return newState

		default:
			return state
	}
}
