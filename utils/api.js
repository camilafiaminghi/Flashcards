import { AsyncStorage } from 'react-native'
export const FLASHCARDS_STORAGE_KEY = 'Flashcards:decks'

import mockStorage from './../__helpers__/decks'

export function setInitialData (data={}) {
	// return AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
	return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
}

export function getDecks () {
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
}

export function getDeck (deckId) {
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
		.then((results) => {
			const data = JSON.parse(results)
			return data[deckId]
		})
}

export function saveDeck ({ title }) {
	return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
		[title]: {
			title,
			questions: []
		}
	}))
}

export function addCardToDeck (deckId, card) {
	return getDeck(deckId)
		.then((entry) => {
			return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
				[deckId]: {
					...entry,
					questions: [...entry.questions, card]
				}
			}))
		})
}
