import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import { AddDeck, mapDispatchToProps } from '../AddDeck'
import AppTextInput from '../../components/AppTextInput'
import decks from '../../__mocks__/decks'

let wrapper
let instance
let component
const navigation = {
	navigate: jest.fn(),
	addListener: jest.fn(),
	dispatch: jest.fn().mockResolvedValue()
}
const props = {
	navigation,
	onAddDeck: jest.fn().mockResolvedValue()
}

const configStore = configureMockStore([thunk])
const store = configStore({decks})

describe('<AddDeck />', () => {

	beforeEach(() => {
		wrapper = renderer.create(<AddDeck {...props} />)
		instance = shallow(<Provider store={store}><AddDeck {...props} /></Provider>)
		component = instance.find(AddDeck).shallow()
	})

	afterEach(() => store.clearActions())

	it('matches snapshot', () => {
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  it('should render', () => {
		expect(wrapper).toBeTruthy()
	})

	it('should has one AppTextInput as child', () => {
		expect(component.find(AppTextInput)).toHaveLength(1)
	})

	it('should has submit if input is valid', () => {
		component.instance().onInputChange('title', 'Title Test', true)

		expect(component.state('valid')).toEqual(true)
		expect(component.find(TouchableOpacity)).toHaveLength(1)
	})

	it('should handle submit', () => {
		component.instance().onInputChange('title', 'Title Test', true)

		const spy = jest.spyOn(component.instance(), 'submit')
		const button = component.find(TouchableOpacity)

		button.props().onPress()
		expect(props.onAddDeck).toHaveBeenCalledTimes(1)
		expect(props.onAddDeck).toHaveBeenCalledWith({title: 'Title Test'})
	})

	it('should mapDispatchToProps return props', () => {
		expect(mapDispatchToProps(store.dispatch)).toHaveProperty('onAddDeck')
	})
})
