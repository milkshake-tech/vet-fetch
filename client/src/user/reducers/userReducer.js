import constants from '../constants/constants'

var initialState = {
	user: null,
	pets: null,
	displayLoginModal: false,
	displaySignUpModal: false
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

		case constants.TOGGLE_LOGIN_MODAL:
			newState['displayLoginModal'] = action.toggleState
			return newState

		case constants.TOGGLE_SIGNUP_MODAL:
			newState['displaySignUpModal'] = action.toggleState
			return newState

		default:
			return state
	}
}
