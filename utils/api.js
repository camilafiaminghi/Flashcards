import { AsyncStorage } from 'react-native'
export const FLASHCARDS_STORAGE_KEY = 'Flashcards:decks'

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

const obj = {
	'JavaScript' : {
		title: 'JavaScript',
		questions: [{}]
	},
	'Test1' : {
		title: 'Test1',
		questions: [{},{},{}]
	},
	'Test2' : {
		title: 'Test2',
		questions: []
	},
	'Test3' : {
		title: 'Test3',
		questions: []
	},
	'Test4' : {
		title: 'Test4',
		questions: []
	},
	'Test5' : {
		title: 'Test5',
		questions: []
	}
}
