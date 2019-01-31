import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import {
		RECEIVE_ENTRIES,
		ADD_ENTRY,
		ADD_CARD,
		receiveEntries,
		addEntry,
		addCard,
		handleReceiveEntries,
		handleAddEntry,
		handleAddCard } from './../index'
import entries from './../../__helpers__/entries'
import card from './../../__helpers__/card'
import MockAsyncStorage from './../../__helpers__/MockAsyncStorage'

jest.setMock('AsyncStorage', MockAsyncStorage)

const configStore = configureMockStore([thunk])
const store = configStore(entries)

describe('actions', () => {
	// CLEAR ACTIONS BEFORE RUN STORE AGAIN TEST MODULE INDEPEDENT OF OTHERS MODULES
	afterEach(() => store.clearActions())

	it('receiveEntries should return an object', () => {
		expect(receiveEntries(entries)).toEqual({
			type: RECEIVE_ENTRIES,
			entries
		})
	})

	it('addEntry should return an object', () => {
		expect(addEntry(Object.keys(entries)[0])).toEqual({
			type: ADD_ENTRY,
			entry: Object.keys(entries)[0]
		})
	})

	it('addCard should return an object', () => {
		expect(addCard(Object.keys(entries)[0], card)).toEqual({
			type: ADD_CARD,
			entryId: Object.keys(entries)[0],
			card
		})
	})

	// TEST ASYNC PASS THROUGH THUNK
	it('successful handleReceiveEntries', () => {
		const expectAction = [
			{ type: RECEIVE_ENTRIES, entries }
		]

		return store.dispatch(handleReceiveEntries())
			.then(() => (expect(store.getActions()).toEqual(expectAction)))
	})

	it('successful handleAddEntry', () => {
		const entry = Object.keys(entries)[0]
		const expectAction = [
			{ type: ADD_ENTRY, entry }
		]

		return store.dispatch(handleAddEntry(entry))
			.then(() => (expect(store.getActions()).toEqual(expectAction)))
	})

	it('successful handleAddCard', () => {
		const entryId = Object.keys(entries)[0]
		const expectAction = [
			{ type: ADD_CARD, entryId, card }
		]

		return store.dispatch(handleAddCard(entryId, card))
			.then(() => (expect(store.getActions()).toEqual(expectAction)))
	})
})
