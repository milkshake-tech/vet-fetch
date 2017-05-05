import constants from '../constants/constants'

var initialState = {
	searchResults: {
		veterinarians: [],
		totalResults: 0,
		zipcode: null
	}
}

export default function(state = initialState, action){
	let newState = Object.assign({}, state)
	switch (action.type) {
		case constants.RECEIVED_SEARCH_RESULTS:
			newState['searchResults'] = action.searchResults
			return newState

		default:
			return state
	}
}
