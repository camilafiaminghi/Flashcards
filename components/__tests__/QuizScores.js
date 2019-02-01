import React, { Component } from 'react'
import { Text } from 'react-native'
import renderer from 'react-test-renderer'
import QuizScores from '../QuizScores'
import card from '../../__helpers__/card'

jest.useFakeTimers()

let wrapper
let instance
let component
const props = {
	scored: 5,
	len: 10
}

describe('<QuizScores />', () => {

	beforeEach(() => {
		wrapper = renderer.create(<QuizScores {...props} />)
		component = shallow(<QuizScores {...props} />)
	})

	it('matches snapshot', () => {
    expect(wrapper.toJSON()).toMatchSnapshot()
  });

	it('should render', () => {
		expect(wrapper).toBeTruthy()
	})

	it('should shows a 50% scored', () => {
		const text = component.find(Text).get(1)
		expect(text.props.children).toEqual(50)
	})
})
