import React, { Component } from 'react'
import { View, Text } from 'react-native'
import renderer from 'react-test-renderer'
import Quiz from '../Quiz'
import Question from '../../components/Question'
import Answer from '../../components/Answer'
import QuizScores from '../../components/QuizScores'
import decks from '../../__helpers__/decks'

jest.useFakeTimers()

let wrapper
let instance
let component
const navigation = {
	navigate: jest.fn(),
	state: {
		params: {
			deck: decks[Object.keys(decks)[0]]
		}
	},
	getParam: jest.fn(),
	setParams: jest.fn()
}
const props = {
	navigation
}

describe('<Quiz />', () => {

	beforeEach(() => {
		wrapper = renderer.create(<Quiz {...props} />)
		component = shallow(<Quiz {...props} />)
	})

	it('matches snapshot', () => {
    expect(wrapper.toJSON()).toMatchSnapshot()
  });

	it('should render', () => {
		expect(wrapper).toBeTruthy()
	})

	it('should shows initial Question as child', () => {
		expect(component.find(Question).shallow()).toBeTruthy()
	})

	it('should shows Answer as child', () => {
		component.instance().toggleSide()
		expect(component.find(Answer).shallow()).toBeTruthy()
	})

	it('should shows QuizScores as child', () => {
		const { deck } = props.navigation.state.params
		component.setState({ current: deck.questions.length })

		expect(component.find(QuizScores).shallow()).toBeTruthy()
	})

	it('should handleNext', () => {
		component.instance().handleNext()

		expect(component.state('current')).toEqual(1)
		expect(component.state('showAnswer')).toEqual(false)
	})

	it('should handleScore', () => {
		component.instance().handleScore()

		expect(component.state('scored')).toEqual(1)
	})

	it('should toggleSide', () => {
		component.instance().toggleSide()

		expect(component.state('showAnswer')).toEqual(true)
	})
})
