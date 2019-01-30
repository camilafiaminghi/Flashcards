import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { gray, lightPurp, purple, white } from '../utils/colors'

class Deck extends Component {

	static navigationOptions = ({ navigation }) => {
		const { entryId } = navigation.state.params
		return {
			title: entryId
		}
	}

	static propTypes = {
		deck: PropTypes.object.isRequired,
		entryId: PropTypes.string.isRequired
	}

	toAddCard = () => {
		const { entryId } = this.props

		this.props.navigation.dispatch(NavigationActions.navigate({
			routeName: 'AddCard',
			params: { entryId }
		}))
	}

	toQuiz = () => {
		this.props.navigation.dispatch(NavigationActions.navigate({
			routeName: 'Quiz'
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

					<TouchableOpacity
						style={[styles.input, styles.btnInverse]}
						onPress={this.toQuiz}>
						<Text style={styles.btnInverseText}>{'Start Quiz'.toUpperCase()}</Text>
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
		deck: entries[entryId]
	}
}

export default connect(mapStateToProps)(Deck)

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
  },
  text: {
  	fontSize: 26,
  	color: '#333333'
  },
  detail: {
  	alignSelf: 'center',
  	fontSize: 16,
  	color: gray
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
	btnInverse: {
		backgroundColor: purple,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 4,
	},
	btnInverseText: {
		fontSize: 14,
		fontWeight: 'bold',
		color: white
	}
})
