import { AsyncStorage } from 'react-native'
export const FLASHCARDS_STORAGE_KEY = 'Flashcards:decks'

import mockStorage from './../__helpers__/entries'

export function setInitialData (data=mockStorage) {
	// return AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
	return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
}

export function getDecks () {
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
}

export function getDeck (entryId) {
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
		.then((results) => {
			const data = JSON.parse(results)
			return data[entryId]
		})
}

export function saveDeckTitle ({ title }) {
	return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
		[title]: {
			title,
			questions: []
		}
	}))
}

export function addCardToDeck (entryId, card) {
	return getDeck(entryId)
		.then((entry) => {
			return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
				[entryId]: {
					...entry,
					questions: [...entry.questions, card]
				}
			}))
		})
}
