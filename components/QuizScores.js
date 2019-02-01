import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { gray, black } from '../utils/colors'

const QuizScores = ({ scored, len }) => {
	const correct = (scored * 100 / len).toFixed(2)

	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<Text style={[styles.text, {fontSize: 90, }]}>{correct}</Text>
				<Text style={[styles.text, {fontSize: 50}]}>%</Text>
			</View>
			<View style={styles.row}>
				<Text style={[styles.detail, {fontSize: 18}]}>correct </Text>
				<Text style={[styles.detail, {fontSize: 16}]}>{scored}/{len}</Text>
			</View>
		</View>
	)
}

QuizScores.propTypes = {
	scored: PropTypes.number.isRequired,
	len: PropTypes.number.isRequired
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
  row: {
  	flexDirection: 'row',
  	alignItems: 'center',
  	marginRight: 10,
		marginLeft: 10
  },
  text: {
  	textAlign: 'center',
		fontWeight: 'bold',
		color: black
  },
	detail: {
  	color: gray
  }
})
