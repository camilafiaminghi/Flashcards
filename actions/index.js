import { setInitialData, getDecks, saveDeck, addCardToDeck } from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export function receiveDecks (decks) {
	return {
		type: RECEIVE_DECKS,
		payload: decks
	}
}

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

export function handleReceiveDecks () {
	return (dispatch) => {
		// dispatch(/* LOADING */)

		return setInitialData()
			.then(getDecks)
			.then((data) => dispatch(receiveDecks(JSON.parse(data))))
	}
}

export function handleAddDeck (deckId) {
	return (dispatch) => {
		// dispatch(/* LOADING */)

		return saveDeck(deckId)
			.then(dispatch(addDeck(deckId)))
	}
}

export function handleAddCard (deckId, card) {
	return (dispatch) => {
		// dispatch(/* LOADING */)

		return addCardToDeck(deckId, card)
			.then(dispatch(addCard(deckId, card)))
	}
}
