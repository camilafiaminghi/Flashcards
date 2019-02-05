import React, { Component } from 'react'
import { Text, TextInput } from 'react-native'
import renderer from 'react-test-renderer'
import AppTextInput from '../AppTextInput'
import { pColorDark } from '../../utils/colors'

let wrapper
let instance
let component
const props = {
	name: 'title',
	placeholder: 'test',
	maxLen: 10,
	onInputChange: jest.fn()
}

describe('<AppTextInput />', () => {

	beforeEach(() => {
		wrapper = renderer.create(<AppTextInput {...props} />)
		component = shallow(<AppTextInput {...props} />)
	})

	it('matches snapshot', () => {
    expect(wrapper.toJSON()).toMatchSnapshot()
  });

	it('should render', () => {
		expect(wrapper).toBeTruthy()
	})

	it('should show exceeded text onChangeText', () => {
		const input = component.find(TextInput)
		input.props().onChangeText('test value that exceeded the maxlen')

		expect(component.state('changed')).toBe(false)
		expect(component.state('valid')).toBe(false)
	})

	it('should handleValidation onChangeText', () => {
		const input = component.find(TextInput)
		input.props().onChangeText('test value')
		component.update()

		expect(component.state('changed')).toBe(true)
		expect(component.state('valid')).toBe(true)
		expect(props.onInputChange).toHaveBeenCalledTimes(1)
	})

	it('should shows characteres exceeded', () => {
		const input = component.find(TextInput)
		input.props().onChangeText('test value')
		component.update()

		const text = component.find(Text)
		expect(text.shallow().props().children).toEqual('max characters exceeded')
	})

	it('should shows characteres limit', () => {
		const input = component.find(TextInput)
		input.props().onChangeText('test')
		component.update()

		const text = component.find(Text)
		expect(text.shallow().props().children).toEqual([6, ' characteres left'])
	})
})
