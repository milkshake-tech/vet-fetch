import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../reducers/userReducer'
import petReducer from '../reducers/petReducer'
import displayReducer from '../reducers/displayReducer'
import searchReducer from '../reducers/searchReducer'
import vetReducer from '../reducers/vetReducer'
import UIReducer from '../reducers/UIReducer'

// Combine reducers
var reducers = combineReducers({
	userReducer: userReducer,
	petReducer: petReducer,
	displayReducer: displayReducer,
	searchReducer: searchReducer,
	vetReducer: vetReducer,
	UIReducer: UIReducer
});

// Create createStore
var store = createStore(
		reducers,
		applyMiddleware(thunk)
		);

export default store;
