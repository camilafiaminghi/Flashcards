import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { textColorInverse, textColor, pColor, pColorLight, pColorDark, sColor, sColorLight, sColorDark } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

export default class QuizScores extends Component {
	static propTypes = {
		scored: PropTypes.number.isRequired,
		len: PropTypes.number.isRequired
	}

	componentDidMount() {
		clearLocalNotification()
			.then(setLocalNotification)
	}

	render(){
		const { scored, len } = this.props
		const percentageScored = Math.floor(scored * 100 / len)

		return (
			<View style={styles.container}>
				<View style={styles.row}>
					<Text style={[styles.detail, {fontSize: 20}]}>{scored}/{len}</Text>
				</View>

				<View style={[styles.row, {marginRight: -10}]}>
					<Text style={[styles.text, {fontSize: 90, fontWeight: 'bold', marginRight: -2}]}>{percentageScored}</Text>
					<Text style={[styles.text, {fontSize: 60}]}>%</Text>
				</View>

				<Text style={[styles.text, {fontSize: 30}]}>Scored</Text>
			</View>
		)
	}
}

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
