import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import renderer from 'react-test-renderer'
import Question from '../Question'
import card from '../../__mocks__/card'

let wrapper
let instance
let component
const props = {
	question: card.question,
	toggleSide: jest.fn()
}

describe('<Question />', () => {

	beforeEach(() => {
		component = shallow(<Question {...props} />)
	})

	it('matches snapshot', () => {
    wrapper = renderer.create(<Question {...props} />)
    expect(wrapper.toJSON()).toMatchSnapshot()
  });

	it('should render', () => {
		expect(wrapper).toBeTruthy()
	})

	it('should call toggleSide onPress TouchableOpacity', () => {
		const button = component.find(TouchableOpacity).get(0)
		button.props.onPress()

		expect(props.toggleSide).toHaveBeenCalledTimes(1)
	})
})
