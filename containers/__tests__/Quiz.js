import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import { Quiz } from '../Quiz'
import mockStore from '../../__helpers__/entries'

let wrapper
const configStore = configureMockStore([thunk])
const store = configStore(mockStore)
const navigation = {
	navigate: jest.fn(),
	state: {
		params: {
			entryId: Object.keys(mockStore)[0]
		}
	},
	getParam: jest.fn(),
	setParams: jest.fn()
}
const props = {
	navigation,
	questions: mockStore[Object.keys(mockStore)[0]].questions
}

describe('<Quiz />', () => {

	beforeEach(() => {
		wrapper = renderer.create(<Provider store={store}><Quiz {...props} /></Provider>)

		console.log(wrapper.toJSON())
	})

	it('should be present', () => {
		// let component = renderer.create(<Quiz/>).toJSON()
		// console.log(component)
	})

})
