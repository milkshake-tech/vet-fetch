import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../reducers/userReducer'
import petReducer from '../reducers/petReducer'
import displayReducer from '../reducers/displayReducer'
import searchReducer from '../reducers/searchReducer'

// Combine reducers
var reducers = combineReducers({
	userReducer: userReducer,
	petReducer: petReducer,
	displayReducer: displayReducer,
	searchReducer: searchReducer
});

// Create createStore
var store = createStore(
		reducers,
		applyMiddleware(thunk)
		);

export default store;
