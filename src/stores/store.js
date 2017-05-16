import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import petReducer from '../reducers/petReducer'
import searchReducer from '../reducers/searchReducer'
import userReducer from '../reducers/userReducer'

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
