import { setInitialData, getDecks, getDeck, saveDeckTitle, addCardToDeck } from '../utils/api'

export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const ADD_ENTRY = 'ADD_ENTRY'
export const ADD_CARD = 'ADD_CARD'

export function receiveEntries (entries) {
	return {
		type: RECEIVE_ENTRIES,
		entries
	}
}

export function addEntry (entry) {
	return {
		type: ADD_ENTRY,
		entry
	}
}

export function addCard (entry, card) {
	return {
		type: ADD_CARD,
		entry,
		card
	}
}

export function handleReceiveEntries () {
	return (dispatch) => {
		// dispatch(/* LOADING */)

		return setInitialData()
			.then(getDecks)
			.then((data) => dispatch(receiveEntries(JSON.parse(data))))
			.catch((error) => console.log(error))
	}
}

export function handleAddEntry (entry) {
	return (dispatch) => {
		// dispatch(/* LOADING */)

		return saveDeckTitle(entry)
			.then(dispatch(addEntry(entry)))
			.catch((error) => console.log(error))
	}
}

export function handleAddCard (entry, card) {
	return (dispatch) => {
		// dispatch(/* LOADING */)

		return addCardToDeck(entry, result)
			.then(dispatch(addCard(entry, card)))
			.catch((error) => console.log(error))
	}
}
