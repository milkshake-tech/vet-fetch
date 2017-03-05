import constants from '../constants/constants'

var initialState = {
	vet: {
		id: null,
		firstName: '',
		lastName: '',
		practiceName: '',
		zipcode: '',
		email: '',
		password: ''
	}
}

export default function(state = initialState, action){
	let newState = Object.assign({}, state)
	switch (action.type) {
		case constants.RECEIVED_VET:
			newState['vet'] = action.vet
			console.log("RECEIVED_VET NEW STATE: "+JSON.stringify(newState.vet))

			return newState

		default:
			return state
	}
}
