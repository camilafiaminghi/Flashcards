import { setInitialData, getDecks, getDeck, saveDeckTitle } from '../utils/api'

export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const ADD_ENTRY = 'ADD_ENTRY'

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
