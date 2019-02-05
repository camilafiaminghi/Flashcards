import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import renderer from 'react-test-renderer'
import Answer from '../Answer'
import card from '../../__mocks__/card'

let wrapper
let instance
let component
const props = {
	answer: card.answer,
	handleScore: jest.fn(),
	handleNext: jest.fn()
}

describe('<Answer />', () => {

	beforeEach(() => {
		component = shallow(<Answer {...props} />)
	})

	it('matches snapshot', () => {
    wrapper = renderer.create(<Answer {...props} />)
    expect(wrapper.toJSON()).toMatchSnapshot()
  });

	it('should render', () => {
		expect(wrapper).toBeTruthy()
	})

	it('should call handleNext onPress TouchableOpacity', () => {
		const button = component.find(TouchableOpacity).get(0)
		button.props.onPress()

		expect(props.handleNext).toHaveBeenCalledTimes(1)
	})

	it('should call handleScore onPress TouchableOpacity', () => {
		const button = component.find(TouchableOpacity).get(1)
		button.props.onPress()

		expect(props.handleScore).toHaveBeenCalledTimes(1)
	})
})
