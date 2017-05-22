import constants from '../constants/constants'
import store from '../../stores/store'

export const receivedSearchResults = (searchResults) => ({
	type: constants.RECEIVED_SEARCH_RESULTS,
	searchResults
})
