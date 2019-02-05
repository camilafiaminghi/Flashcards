import React, { Component } from 'react'
import { FlatList, Text, TouchableOpacity } from 'react-native'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import { Decks, mapStateToProps } from '../Decks'
import decks from '../../__mocks__/decks'

let wrapper
let instance
let component
const navigation = {
	navigate: jest.fn(),
	dispatch: jest.fn()
}
const props = {
	navigation,
	decksKeys: Object.keys(decks),
	decks
}

const configStore = configureMockStore([thunk])
const store = configStore({decks})

describe('<Decks />', () => {

	beforeEach(() => {
		wrapper = renderer.create(<Decks {...props} />)
		instance = shallow(<Provider store={store}><Decks {...props} /></Provider>)
		component = instance.find(Decks).shallow()
	})

	afterEach(() => store.clearActions())

	it('matches snapshot', () => {
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  it('should render', () => {
		expect(wrapper).toBeTruthy()
	})

	it('should has two FlatList component as child', () => {
		expect(component.find(FlatList).exists()).toEqual(true)
		expect(component.find(FlatList)).toHaveLength(1)
	})

	it('should has two Text componets as children', () => {
		const list = component.find(FlatList)
		expect(list.props().data).toEqual(props.decksKeys)
	})

	it('should mapStateToProps return props', () => {
		expect(mapStateToProps(store.getState(), { navigation })).toHaveProperty('decks')
	})
})
