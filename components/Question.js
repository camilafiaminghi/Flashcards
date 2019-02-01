import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { textColorInverse, textColor, pColor, pColorLight, pColorDark, sColor, sColorLight, sColorDark } from '../utils/colors'

const Question = ({ question, toggleSide }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{question}</Text>

			<TouchableOpacity
				style={[styles.input, styles.btn]}
				onPress={toggleSide}>
				<Text style={styles.btnText}>{'Show Answer'.toUpperCase()}</Text>
			</TouchableOpacity>
		</View>
	)
}

Question.propTypes = {
	question: PropTypes.string.isRequired,
	toggleSide: PropTypes.func.isRequired
}

export default Question

/* STYLES */
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  	flexGrow: 1,
  	alignItems: 'center',
  	justifyContent: 'center'
  },
  text: {
  	textAlign: 'center',
		fontSize: 28,
		marginRight: 10,
		marginLeft: 10,
		marginBottom: 20,
		color: textColor
  },
  input: {
		flexDirection: 'row',
		alignSelf: 'stretch',
		height: 50,
	},
	btn: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 4,
		marginRight: 10,
		marginLeft: 10
	},
	btnText: {
		fontSize: 14,
		fontWeight: 'bold',
		color: pColorDark
	}
})
