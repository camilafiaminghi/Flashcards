import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import renderer from 'react-test-renderer'
import AppStatusBar from '../AppStatusBar'
import { pColorDark } from '../../utils/colors'

let wrapper
let instance
let component
const props = {
	backgroundColor: pColorDark
}

describe('<AppStatusBar />', () => {

	beforeEach(() => {
		component = shallow(<AppStatusBar {...props} />)
	})

	it('matches snapshot', () => {
    wrapper = renderer.create(<AppStatusBar {...props} />)
    expect(wrapper.toJSON()).toMatchSnapshot()
  });

	it('should render', () => {
		expect(wrapper).toBeTruthy()
	})
})
