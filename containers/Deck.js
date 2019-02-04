import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavigationActions, HeaderBackButton } from 'react-navigation'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import { textColorInverse, textColor, pColor, pColorLight, pColorDark, sColor, sColorLight, sColorDark } from '../utils/colors'

class Deck extends Component {

	static navigationOptions = ({ navigation }) => {
		const { deckId } = navigation.state.params
		return {
			title: deckId,
			headerLeft: (
	      <HeaderBackButton
	        onPress={() => navigation.navigate('Decks', { parentNavigation: navigation })}
	      />
	    )
		}
	}

	static propTypes = {
		deck: PropTypes.object.isRequired,
		deckId: PropTypes.string.isRequired
	}

	toAddCard = () => {
		const { deckId } = this.props

		this.props.navigation.dispatch(NavigationActions.navigate({
			routeName: 'AddCard',
			params: { deckId }
		}))
	}

	toQuiz = () => {
		const { deck } = this.props

		this.props.navigation.dispatch(NavigationActions.navigate({
			routeName: 'Quiz',
			params: { deck }
		}))
	}

	render() {
		const { deck } = this.props

		return (
			<View style={styles.container}>
				<View style={styles.card}>
					<View style={styles.cardTitle}>
						<Text style={styles.text}>{deck.title}</Text>
						<Text style={styles.detail}>{deck.questions.length} { deck.questions.length === 1 && 'card' } { deck.questions.length !== 1 && 'cards' }</Text>
					</View>

					<TouchableOpacity
						style={[styles.input, styles.btn]}
						onPress={this.toAddCard}>
						<Text style={styles.btnText}>{'Add Card'.toUpperCase()}</Text>
					</TouchableOpacity>

					{ (deck.questions.length > 0) &&
						<TouchableOpacity
							style={[styles.input, styles.btn]}
							onPress={this.toQuiz}>
							<Text style={styles.btnText}>{'Start Quiz'.toUpperCase()}</Text>
						</TouchableOpacity>
					}
				</View>
			</View>
		)
	}
}

export const mapStateToProps = ({ decks }, { navigation }) => {
	const { deckId } = navigation.state.params

	return {
		deckId,
		deck: decks[deckId]
	}
}

export default connect(mapStateToProps)(Deck)

/* STYLES */
const styles = StyleSheet.create({
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
  },
  text: {
  	textAlign: 'center',
  	fontSize: 26,
		marginRight: 24,
		marginLeft: 24,
		color: textColor
  },
  detail: {
  	alignSelf: 'center',
  	fontSize: 16,
  	color: sColorDark
  },
  input: {
		flexDirection: 'row',
		alignSelf: 'stretch',
		height: 50,
		borderBottomColor: pColorDark,
		borderBottomWidth: 1,
		borderRadius: 3,
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
