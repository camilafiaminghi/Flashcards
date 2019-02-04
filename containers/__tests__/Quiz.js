import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import { Quiz } from '../Quiz'
import mockStore from '../../__helpers__/decks'

let wrapper
let component
const configStore = configureMockStore([thunk])
const store = configStore(mockStore)
const navigation = {
	navigate: jest.fn(),
	state: {
		params: {
			deckId: Object.keys(mockStore)[0]
		}
	},
	getParam: jest.fn(),
	setParams: jest.fn()
}
const props = {
	navigation,
	deckId: Object.keys(mockStore)[0],
	questions: mockStore[Object.keys(mockStore)[0]].questions
}

describe('<Quiz />', () => {

	beforeEach(() => {
		wrapper = renderer.create(<Provider store={store}><Quiz {...props} /></Provider>)
		component = shallow(<Quiz {...props} />)
	})

	it('matches snapshot', () => {
    expect(wrapper.toJSON()).toMatchSnapshot()
  });

	it('should render', () => {
		expect(wrapper).toBeTruthy()
	})

})
