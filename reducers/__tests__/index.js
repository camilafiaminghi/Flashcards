import {
		RECEIVE_DECKS,
		ADD_DECK,
		ADD_CARD } from '../../actions'
import decks from '../index'
import mockDecks from '../../__helpers__/decks'

const initialState = {}

describe('reducer', () => {
	it('should handle initial state', () => {
		expect(decks(initialState, {})).toEqual(initialState)
	})

	it('should handle RECEIVE_DECKS', () => {
		expect(decks({payload: mockDecks}, {
			type: RECEIVE_DECKS
		})).toMatchObject({...initialState, payload: mockDecks})
	})

	it('should handle ADD_DECK', () => {
		const deck = mockDecks[Object.keys(mockDecks)[0]]

		expect(decks(initialState, {
			type: ADD_DECK,
			payload: {title: deck.title}
		})).toMatchObject({...initialState, [deck.title]: {title: deck.title, questions: []}})
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
