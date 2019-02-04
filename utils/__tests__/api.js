import {
	setInitialData,
	getDecks,
	getDeck,
	saveDeck,
	addCardToDeck } from '../api'

import decks from '../../__helpers__/decks'
import card from '../../__helpers__/card'
import MockAsyncStorage from './../../__helpers__/MockAsyncStorage'

jest.setMock('AsyncStorage', MockAsyncStorage)

describe('api', () => {

	it('setInitialData should return null', () => {
		setInitialData()
			.then((result) => expect(result).toEqual(null))
	})

	it('getDeck should return null', () => {
		getDecks()
			.then((result) => expect(result).toEqual(null))
	})

	it('saveDeck should return null', () => {
		saveDeck(Object.keys(decks)[0])
			.then((result) => expect(result).toEqual(null))
	})

	it('addCardToDeck should return null', () => {
		addCardToDeck(Object.keys(decks)[0])
			.then((result) => expect(result).toEqual(null))
	})
})
