import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { gray, lightPurp, purple, white } from '../utils/colors'

const Answer = ({ answer, handleScore, handleNext }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{answer}</Text>

			<TouchableOpacity
				style={[styles.input, styles.btnInverse]}
				onPress={handleScore}>
				<Text style={styles.btnInverseText}>Correct</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[styles.input, styles.btn]}
				onPress={handleNext}>
				<Text style={styles.btnText}>Incorrect</Text>
			</TouchableOpacity>
		</View>
	)
}

Answer.propTypes = {
	answer: PropTypes.string.isRequired,
	handleScore: PropTypes.func.isRequired,
	handleNext: PropTypes.func.isRequired
}

export default Answer

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
	},
	btnInverse: {
		backgroundColor: purple,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 4,
	},
	btnInverseText: {
		fontSize: 14,
		fontWeight: 'bold',
		color: white
	}
})
