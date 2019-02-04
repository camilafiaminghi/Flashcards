import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { textColorInverse, textColor, pColor, pColorLight, pColorDark, sColor, sColorLight, sColorDark } from '../utils/colors'
import Question from './../components/Question'
import Answer from './../components/Answer'
import QuizScores from './../components/QuizScores'

export default class Quiz extends Component {

	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam('current', 'Quiz')
		}
	}

	state = {
		current: 0,
		scored: 0,
		showAnswer: false
	}

	handleNext = () => {
		const { navigation } = this.props
		const { current } = this.state
		const { deck } = navigation.state.params

		this.setState((state) => ({
			...state,
			current: state.current + 1,
			showAnswer: false
		}))

		if ( current + 1 === deck.questions.length ) {
			navigation.setParams({current: `${deck.title}`})
		} else {
			navigation.setParams({current: `${deck.title} ${current + 2}/${deck.questions.length}`})
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
		const { current } = this.state
		const { navigation } = this.props
		const { deck } = navigation.state.params

		navigation.setParams({current: `${deck.title} ${current + 1}/${deck.questions.length}`})
	}

	render() {
		const { current, showAnswer, scored } = this.state
		const { deck } = this.props.navigation.state.params

		if ( current === deck.questions.length ) {
			return (
				<QuizScores
					scored={scored}
					len={deck.questions.length} />
			)
		}

		const { question, answer } = deck.questions[current]

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

/* STYLES */
styles = StyleSheet.create({
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
