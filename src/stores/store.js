import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import searchReducer from '../vet-search/reducers/searchReducer'
import petReducer from '../pet-survey/reducers/petReducer'
import userReducer from '../user/reducers/userReducer'

var store

export default {
	configureStore: (initialState) => {
		var reducers = combineReducers({
		 	petReducer: petReducer,
		 	searchReducer: searchReducer,
		 	userReducer: userReducer
	 })

	 store = createStore(
		 	reducers,
			initialState,
			applyMiddleware(thunk)
	 )
	 return store
 },

 currentStore: () => {
	 return store
 }
}
