import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import { validationRules } from '../utils/validation'
import { textColorInverse, textColor, pColor, pColorLight, pColorDark, sColor, sColorLight, sColorDark } from '../utils/colors'

class AppTextInput extends Component {

	static propTypes = {
		name: PropTypes.string.isRequired,
		placeholder: PropTypes.string.isRequired,
		maxLen: PropTypes.number.isRequired,
		onInputChange: PropTypes.func.isRequired
	}

	state = {
		text: '',
		changed: false,
		valid: false
	}

	handleValidation = (value) => {
		const { name, onInputChange, maxLen } = this.props
		const valid = validationRules(name, value)

		if ( value.length <= maxLen ) {
			this.setState((state) => ({
				...state,
				text: value,
				changed: true,
				valid
			}))

			onInputChange(name, value, valid)
		}
	}

	render() {
		const { text, changed, valid } = this.state
		const { maxLen, placeholder } = this.props
		const textLeft = maxLen - text.length

		return (
			<View style={styles.container}>
				<TextInput
					style={[styles.input, styles.inputText]}
					placeholderTextColor={pColorDark}
	        placeholder={placeholder}
	        onChangeText={this.handleValidation}
	        value={text} />

	      { (textLeft !== 0 && textLeft < maxLen && changed) && <Text style={styles.text}>{ textLeft } characteres left</Text> }
	      { (textLeft === 0 && changed) && <Text style={styles.text}>max characters exceeded</Text>}
			</View>
		)
	}
}

export default AppTextInput

/* STYLES */
const styles = StyleSheet.create({
	container: {
		alignSelf: 'stretch',
		margin: 10
	},
	input: {
		flexDirection: 'row',
		alignSelf: 'stretch',
		height: 50,
		borderBottomColor: pColorDark,
		borderBottomWidth: 2,
		borderRadius: 3
	},
	inputText: {
		padding: 8
	},
	text: {
		fontSize: 12,
		color: textColor
	}
})
