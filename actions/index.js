import { setInitialData, getDecks  } from '../utils/api'

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
		// dispatch(showLoading())

		return setInitialData()
			.then(getDecks)
			.then((data) => {
				dispatch(receiveEntries(JSON.parse(data)))
			})
			.catch((error) => {
				console.log(error)
			})
	}
}
