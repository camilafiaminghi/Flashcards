import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { gray, lightPurp, purple, white } from '../utils/colors'

export class Quiz extends Component {

	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam('current', 'Quiz')
		}
	}

	static propTypes = {
		questions: PropTypes.array.isRequired
	}

	state = {
		current: 0,
		score: 0
	}

	updateTitle = () => {
		const { current } = this.state
		const { entryId, questions, navigation } = this.props

		navigation.setParams({current: `${entryId} ${current + 1}/${questions.length}`})
	}

	next = () => {
		const { entryId, questions, navigation } = this.props
		const { current } = this.state

		if ( current !== questions.length ) {
			this.setState((state) => ({
				...state,
				current: state.current + 1
			}))

			this.updateTitle()
			// navigation.setParams({current: `${entryId} ${next}/${questions.length}`})
		}
	}

	handleScore = () => {

		/* increment score if correct is triggered */
		/* change to next question */
		/* if not has next question show score in percents */
	}

	componentDidMount() {
		this.updateTitle()
	}

	render() {
		const { questions } = this.props
		const { current } = this.state

		if ( (current - 1) === questions.length ) {
			return (
				<View style={styles.container}>
					<View style={styles.card}>
						<Text>Quiz Finished</Text>
					</View>
				</View>
			)
		}

		return (
			<View style={styles.container}>
				<View style={styles.card}>
					<Text>Quiz</Text>

					<TouchableOpacity
						style={[styles.input, styles.btn]}
						onPress={this.handleScore}>
						<Text style={styles.btnText}>Correct</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.input, styles.btn]}
						onPress={this.next}>
						<Text style={styles.btnText}>Incorrect</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

export const mapStateToProps = ({ entries }, { navigation }) => {
	const { entryId } = navigation.state.params

	return {
		entryId,
		questions: entries[entryId].questions
	}
}

export default connect(mapStateToProps)(Quiz)

/* STYLES */
export const styles = StyleSheet.create({
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
})
