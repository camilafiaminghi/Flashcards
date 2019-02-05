import React, { Component } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import { Deck, mapStateToProps } from '../Deck'
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
	dispatch: jest.fn()
}
const props = {
	navigation,
	deckId: Object.keys(decks)[0],
	deck: decks[Object.keys(decks)[0]]
}

const configStore = configureMockStore([thunk])
const store = configStore({decks})

describe('<Deck />', () => {

	beforeEach(() => {
		wrapper = renderer.create(<Deck {...props} />)
		instance = shallow(<Provider store={store}><Deck {...props} /></Provider>)
		component = instance.find(Deck).shallow()
	})

	afterEach(() => store.clearActions())

	it('matches snapshot', () => {
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  it('should render', () => {
		expect(wrapper).toBeTruthy()
	})

	it('should has two Text components as children', () => {
		const title = component.find(Text).get(0)
		const questionsLen = component.find(Text).get(1)

		expect(title.props.children).toEqual(props.deck.title)
		expect(questionsLen.props.children).toEqual([props.deck.questions.length, ' ', false, ' ', 'cards'])
		expect(component.find(Text)).toHaveLength(4)
	})

	it('should has two TouchableOpacity components as children', () => {
		expect(component.find(TouchableOpacity).exists()).toEqual(true)
		expect(component.find(TouchableOpacity)).toHaveLength(2)
	})

	it('should handle toAddCard onPress', () => {
		const button = component.find(TouchableOpacity).get(0)
		button.props.onPress()
		expect(props.navigation.dispatch).toHaveBeenCalled()
	})

	it('should handle toQuiz onPress', () => {
		const button = component.find(TouchableOpacity).get(1)
		button.props.onPress()
		expect(props.navigation.dispatch).toHaveBeenCalled()
	})

	it('should mapStateToProps return props', () => {
		expect(mapStateToProps(store.getState(), { navigation })).toHaveProperty('deck')
	})
})
