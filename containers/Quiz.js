import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { gray, lightPurp, purple, white } from '../utils/colors'

class Quiz extends Component {

	static navigationOptions = () => {
		return {
			title: 'Quiz'
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.card}>
					<Text>Quiz</Text>
				</View>
			</View>
		)
	}
}

export default connect()(Quiz)

/* STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  card: {
  	flex: 1,
  	flexGrow: 1,
  	alignItems: 'center',
  	justifyContent: 'center',
  	backgroundColor: 'white',
  	margin: 8,
		padding: 8,
  	borderRadius: 4,
  },
  cardTitle: {
  	marginBottom: 40,
  }
})
