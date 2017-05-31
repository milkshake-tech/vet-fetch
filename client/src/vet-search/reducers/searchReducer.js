import constants from '../constants/constants'

var initialState = {
	searchResults: {
		offset: 0,
		totalResults: 0,
		veterinarians: [],
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
