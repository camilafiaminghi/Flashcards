import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { textColorInverse, textColor, pColor, pColorLight, pColorDark, sColor, sColorLight, sColorDark } from '../utils/colors'
import Question from './../components/Question'
import Answer from './../components/Answer'
import QuizScores from './../components/QuizScores'

export class Quiz extends Component {

	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam('current', 'Quiz')
		}
	}

	static propTypes = {
		deckId: PropTypes.string.isRequired,
		questions: PropTypes.array.isRequired
	}

	state = {
		current: 0,
		scored: 0,
		showAnswer: false
	}

	handleNext = () => {
		const { deckId, questions, navigation } = this.props
		const { current } = this.state

		this.setState((state) => ({
			...state,
			current: state.current + 1,
			showAnswer: false
		}))

		if ( current + 1 === questions.length ) {
			navigation.setParams({current: `${deckId}`})
		} else {
			navigation.setParams({current: `${deckId} ${current + 2}/${questions.length}`})
		}
	}

	handleScore = () => {
		const { scored } = this.state

		this.setState((state) => ({
			...state,
			scored: scored + 1
		}))

		this.handleNext()
	}

	toggleSide = () => {
		const { showAnswer } = this.state

		this.setState((state) => ({
			...state,
			showAnswer: !showAnswer
		}))
	}

	componentDidMount() {
		const { current, scored } = this.state
		const { deckId, questions, navigation } = this.props
		navigation.setParams({current: `${deckId} ${current + 1}/${questions.length}`})
	}

	render() {
		const { questions } = this.props
		const { current, showAnswer, scored } = this.state

		if ( current === questions.length ) {
			return (
				<QuizScores
					scored={scored}
					len={questions.length} />
			)
		}

		const { question, answer } = questions[current]

		return (
			<View style={styles.container}>
				<View style={styles.card}>
					{ (!showAnswer) &&
						<Question
							question={question}
							toggleSide={this.toggleSide} />
					}

					{ (showAnswer) &&
						<Answer
							answer={answer}
							handleScore={this.handleScore}
							handleNext={this.handleNext} />
					}
				</View>
			</View>
		)
	}
}

export const mapStateToProps = ({ entries }, { navigation }) => {
	const { deckId } = navigation.state.params

	return {
		deckId,
		questions: entries[deckId].questions
	}
}

export default connect(mapStateToProps)(Quiz)

/* STYLES */
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: sColorLight,
    paddingTop: 4,
    paddingBottom: 4
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
