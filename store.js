import thunk from 'redux-thunk'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import reducer from './reducers'

const store = createStore(
	combineReducers({
		reducer
	}),
	applyMiddleware(thunk)
)

export default store
