export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export const addDeck = (deck) => {
	return {
		type: ADD_DECK,
		payload: deck
	}
}

export function addCard (deckId, card) {
	return {
		type: ADD_CARD,
		payload: { deckId, card }
	}
}

export function handleAddDeck (deckId) {
	return (dispatch) => {
		return Promise.all([
      dispatch(addDeck(deckId))
    ])
	}
}

export function handleAddCard (deckId, card) {
	return (dispatch) => {
		return Promise.all([
      dispatch(addCard(deckId, card))
    ])
	}
}
