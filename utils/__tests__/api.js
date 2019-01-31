import {
	setInitialData,
	getDecks,
	getDeck,
	saveDeckTitle,
	addCardToDeck } from '../api'

import entries from '../../__helpers__/entries'
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

	it('saveDeckTitle should return null', () => {
		saveDeckTitle(Object.keys(entries)[0])
			.then((result) => expect(result).toEqual(null))
	})

	it('addCardToDeck should return null', () => {
		addCardToDeck(Object.keys(entries)[0])
			.then((result) => expect(result).toEqual(null))
	})
})
