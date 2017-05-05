import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import displayReducer from '../reducers/displayReducer'
import petReducer from '../reducers/petReducer'
import searchReducer from '../reducers/searchReducer'
import userReducer from '../reducers/userReducer'

// Combine reducers
var reducers = combineReducers({
	displayReducer: displayReducer,
	petReducer: petReducer,
	searchReducer: searchReducer,
	userReducer: userReducer
});

// Create createStore
var store = createStore(
		reducers,
		applyMiddleware(thunk)
		);

export default store;
