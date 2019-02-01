import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { gray, lightPurp, purple, white } from '../utils/colors'

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
		fontSize: 24,
		marginRight: 10,
		marginLeft: 10,
		marginBottom: 20,
		color: '#333333'
  },
  input: {
		height: 50,
		borderColor: purple,
		borderWidth: 1,
		borderRadius: 4,
		margin: 5,
		paddingTop: 4,
		paddingBottom: 4,
		paddingRight: 24,
		paddingLeft: 24,
		minWidth: 160
	},
	btn: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnText: {
		fontSize: 14,
		fontWeight: 'bold',
		color: purple
	}
})
