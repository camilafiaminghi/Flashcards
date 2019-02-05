import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import { AddCard, mapStateToProps, mapDispatchToProps } from '../AddCard'
import AppTextInput from '../../components/AppTextInput'
import decks from '../../__mocks__/decks'

let wrapper
let instance
let component
const navigation = {
	navigate: jest.fn(),
	state: {
		params: {
			deckId: Object.keys(decks)[0]
		}
	},
	getParam: jest.fn(),
	setParams: jest.fn(),
	dispatch: jest.fn().mockResolvedValue()
}
const props = {
	navigation,
	deckId: Object.keys(decks)[0],
	onAddCard: jest.fn().mockResolvedValue()
}

const configStore = configureMockStore([thunk])
const store = configStore({decks})

describe('<AddCard />', () => {

	beforeEach(() => {
		wrapper = renderer.create(<AddCard {...props} />)
		instance = shallow(<Provider store={store}><AddCard {...props} /></Provider>)
		component = instance.find(AddCard).shallow()
	})

	afterEach(() => store.clearActions())

	it('matches snapshot', () => {
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

	it('should render', () => {
		expect(wrapper).toBeTruthy()
	})

	it('should has two AppTextInput as children', () => {
		expect(component.find(AppTextInput)).toHaveLength(2)
	})

	it('should has submit if inputs are valid', () => {
		component.instance().onInputChange('question', 'Question Test', true)
		component.instance().onInputChange('answer', 'Answer Test', true)

		expect(component.state('valid')).toEqual(true)
		expect(component.find(TouchableOpacity)).toHaveLength(1)
	})

	it('should handle submit', () => {
		component.instance().onInputChange('question', 'Question Test', true)
		component.instance().onInputChange('answer', 'Answer Test', true)

		const spy = jest.spyOn(component.instance(), 'submit')
		const button = component.find(TouchableOpacity)

		button.props().onPress()
		expect(props.onAddCard).toHaveBeenCalledTimes(1)
		expect(props.onAddCard).toHaveBeenCalledWith(props.deckId, component.state('card'))
	})

	it('should mapStateToProps return props', () => {
		expect(mapStateToProps(store.getState(), { navigation })).toHaveProperty('deckId')
	})

	it('should mapDispatchToProps return props', () => {
		expect(mapDispatchToProps(store.dispatch)).toHaveProperty('onAddCard')
	})
})
