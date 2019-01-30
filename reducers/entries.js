import {
		RECEIVE_ENTRIES,
		ADD_ENTRY,
		ADD_CARD } from '../actions'

function entries (state = {}, action) {
	switch (action.type) {
		case RECEIVE_ENTRIES:
			return {
				...state,
				...action.entries
			}
		case ADD_ENTRY:
			return {
				...state,
				[action.entry.title] : {
					title: action.entry.title,
					questions: []
				}
			}
		case ADD_CARD:
			return {
				...state,
				[action.entry] : {
					...state[action.entry],
					questions: [...state[action.entry].questions, action.card]
				}
			}
		default:
			return state
	}
}

export default entries
