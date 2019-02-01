import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { gray, lightPurp, purple, white } from '../utils/colors'
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
		entryId: PropTypes.string.isRequired,
		questions: PropTypes.array.isRequired
	}

	state = {
		current: 0,
		scores: 0,
		showAnswer: false
	}

	handleNext = () => {
		const { entryId, questions, navigation } = this.props
		const { current } = this.state

		this.setState((state) => ({
			...state,
			current: state.current + 1,
			showAnswer: false
		}))

		if ( current + 1 === questions.length ) {
			navigation.setParams({current: `${entryId} Scores`})
		} else {
			navigation.setParams({current: `${entryId} ${current + 2}/${questions.length}`})
		}
	}

	handleScore = () => {

		/* increment score if correct is triggered */
		/* change to next question */
		/* if not has next question show score in percents */
	}

	toggleSide = () => {
		const { showAnswer } = this.state

		this.setState((state) => ({
			...state,
			showAnswer: !showAnswer
		}))
	}

	componentDidMount() {
		const { current, scores } = this.state
		const { entryId, questions, navigation } = this.props
		navigation.setParams({current: `${entryId} ${current + 1}/${questions.length}`})
	}

	render() {
		const { questions } = this.props
		const { current, showAnswer, scores } = this.state

		if ( current === questions.length ) {
			return (<QuizScores scores={scores} />)
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
  }
})
