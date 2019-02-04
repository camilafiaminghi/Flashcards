import {
		RECEIVE_DECKS,
		ADD_DECK,
		ADD_CARD } from '../actions'

const decks = (state = {}, action) => {
	switch (action.type) {
		case RECEIVE_DECKS:
			return {
				...state,
				...action.payload
			}
		case ADD_DECK:
			return {
				...state,
				[action.payload.title] : {
					title: action.payload.title,
					questions: []
				}
			}
		case ADD_CARD:
			return {
				...state,
				[action.payload.deckId] : {
					...state[action.payload.deckId],
					questions: [...state[action.payload.deckId].questions, action.payload.card]
				}
			}
		default:
			return state
	}
}

export default decks
