import { AsyncStorage } from 'react-native'
export const FLASHCARDS_STORAGE_KEY = 'Flashcards:decks'

const obj = {
	'JavaScript' : {
		title: 'JavaScript',
		questions: [{}]
	},
	'React' : {
		title: 'React',
		questions: [{},{},{}]
	}
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function setInitialData (data=obj) {
	return AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
}

export function getDecks () {
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
}

export function getDeck (id) {
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
		then((results) => {
			const data = JSON.parse(results)
			return data.filter((deck) => (deck.id === id))
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
