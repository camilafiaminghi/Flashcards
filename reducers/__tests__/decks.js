import {
		RECEIVE_DECKS,
		ADD_DECK,
		ADD_CARD } from '../../actions'
import decks from '../index'
import mockDecks from '../../__helpers__/decks'

const initialState = {decks:{}}

describe('reducer', () => {
	it('should handle initial state', () => {
		expect(decks(initialState, {})).toEqual(initialState)
	})

	it('should handle ADD_DECK', () => {
		const deck = mockDecks[Object.keys(mockDecks)[0]]

		expect(decks(initialState, {
			type: ADD_DECK,
			payload: {title: deck.title}
		})).toMatchObject({...initialState})
	})

	it('should handle ADD_CARD', () => {
		const deckId = Object.keys(mockDecks)[0]
		const card = mockDecks[deckId].questions

		expect(decks(initialState, {
			type: ADD_DECK,
			payload: { deckId, card }
		})).toMatchObject({...initialState})
	})
})
