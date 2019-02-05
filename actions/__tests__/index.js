import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import {
	ADD_DECK,
	ADD_CARD,
	addDeck,
	addCard,
	handleAddDeck,
	handleAddCard } from '../index'
import decks from '../../__helpers__/decks'
import card from '../../__helpers__/card'
import MockAsyncStorage from '../../__helpers__/MockAsyncStorage'

jest.setMock('AsyncStorage', MockAsyncStorage)
const configStore = configureMockStore([thunk])
const store = configStore({decks})

describe('actions', () => {
	// CLEAR ACTIONS BEFORE RUN STORE AGAIN TEST MODULE INDEPEDENT OF OTHERS MODULES
	afterEach(() => store.clearActions())

	it('addDeck should return an object', () => {
		expect(addDeck(Object.keys(decks)[0])).toEqual({
			type: ADD_DECK,
			payload: Object.keys(decks)[0]
		})
	})

	it('addCard should return an object', () => {
		expect(addCard(Object.keys(decks)[0], card)).toEqual({
			type: ADD_CARD,
			payload: { deckId: Object.keys(decks)[0], card }
		})
	})

	// TEST ASYNC PASS THROUGH THUNK
	it('successful handleAddDeck', () => {
		const deck = Object.keys(decks)[0]
		const expectAction = [
			{ type: ADD_DECK, payload: deck }
		]

		return store.dispatch(handleAddDeck(deck))
			.then(() => (expect(store.getActions()).toEqual(expectAction)))
	})

	it('successful handleAddCard', () => {
		const deckId = Object.keys(decks)[0]
		const expectAction = [
			{ type: ADD_CARD, payload: { deckId, card } }
		]

		return store.dispatch(handleAddCard(deckId, card))
			.then(() => (expect(store.getActions()).toEqual(expectAction)))
	})
})
