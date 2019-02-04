import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { textColorInverse, textColor, pColor, pColorLight, pColorDark, sColor, sColorLight, sColorDark } from '../utils/colors'
import { Ionicons } from '@expo/vector-icons'

const Answer = ({ answer, handleScore, handleNext }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{answer}</Text>

			<View style={styles.row}>
				<TouchableOpacity
					style={[styles.input, styles.btn]}
					onPress={handleNext}>
					<Ionicons name='ios-close-circle' size={50} color={pColorDark} />
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.input, styles.btn]}
					onPress={handleScore}>
					<Ionicons name='ios-checkbox' size={50} color={pColorDark} />
				</TouchableOpacity>
			</View>
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
const styles = StyleSheet.create({
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
