import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { textColorInverse, textColor, pColor, pColorLight, pColorDark, sColor, sColorLight, sColorDark } from '../utils/colors'

const QuizScores = ({ scored, len }) => {
	const correct = Math.floor(scored * 100 / len)

	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<Text style={[styles.detail, {fontSize: 20}]}>{scored}/{len}</Text>
			</View>

			<View style={styles.row}>
				<Text style={[styles.text, {fontSize: 90, fontWeight: 'bold'}]}>{correct}</Text>
				<Text style={[styles.text, {fontSize: 40, fontWeight: 'bold'}]}>%</Text>
			</View>

			<Text style={[styles.text, {fontSize: 30}]}>Scored</Text>
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
		color: textColor
  },
	detail: {
  	color: textColor
  }
})
