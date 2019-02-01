import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { gray, lightPurp, purple, white } from '../utils/colors'

const QuizScores = ({ scores }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{scores}</Text>
		</View>
	)
}

QuizScores.propTypes = {
	scores: PropTypes.number.isRequired
}

export default QuizScores

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
})
