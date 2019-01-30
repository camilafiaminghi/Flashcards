import { getDecks } from '../utils/api'

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
		// dispatch(saveCommentRequest(comment))

		return getDecks(comment, parentId)
			.then((data) => {
				console.log(data);
			})
			.catch(() => {
				// dispatch(showCommentFailure('save'))
				// dispatch(hideLoading())
			})
	}
}
