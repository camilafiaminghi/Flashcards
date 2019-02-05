import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { StyleSheet, KeyboardAvoidingView, Text, View, TouchableOpacity } from 'react-native'
import { handleAddCard } from '../actions'
import { textColorInverse, textColor, pColor, pColorLight, pColorDark, sColor, sColorLight, sColorDark } from '../utils/colors'
import { isValid } from '../utils/validation'
import AppTextInput from '../components/AppTextInput'

export class AddCard extends Component {

	static navigationOptions = ({ navigation }) => {
		return {
			title: 'New Card'
		}
	}

	static propTypes = {
		deckId: PropTypes.string.isRequired
	}

	state = {
		card: {
			question: '',
			answer: ''
		},
		validation: {
			question: false,
			answer: false
		},
		valid: false
	}

	onInputChange = (name, value, valid) => {
		this.setState((state) => ({
			...state,
			card: {
				...state.card,
				[name]: value
			},
			validation: {
				...state.validation,
				[name]: valid
			}
		}))

		/* VALIDATE ALL */
		this.setState((state) => ({
			...state,
			valid: isValid(state.validation)
		}))
	}

	toDeck = () => {
		const { deckId } = this.props

		this.props.navigation.dispatch(NavigationActions.navigate({
			routeName: 'Deck',
			params: { deckId }
		}))
	}

	submit = () => {
		const { onAddCard, deckId } = this.props
		const { card } = this.state

		onAddCard(deckId, card)
			.then(this.toDeck) /* Navigate to Deck */
	}

	render() {
		const { valid } = this.state

		return (
			<View style={styles.container}>
				<KeyboardAvoidingView behavior='padding' style={styles.card}>

					<AppTextInput
						name='question'
						placeholder='Question? (max 122 characters)'
						maxLen={122}
						onInputChange={this.onInputChange} />

					<AppTextInput
						name='answer'
						placeholder='Answer (max 255 characters)'
						maxLen={255}
						onInputChange={this.onInputChange} />

				  <TouchableOpacity
		      	style={[styles.input, styles.btn]}
		      	disabled={!valid}
		      	onPress={this.submit}>
		      	<Text style={ valid ? styles.btnText : styles.btnDisabledText }>{'submit'.toUpperCase()}</Text>
		      </TouchableOpacity>
				</KeyboardAvoidingView>
			</View>
		)
	}
}

export const mapStateToProps = (state, { navigation }) => {
	const { deckId } = navigation.state.params
	return {
		deckId
	}
}

export const mapDispatchToProps = (dispatch) => {
	return {
		onAddCard: (deckId, card) => dispatch(handleAddCard(deckId, card))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)

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
  text: {
  	flexDirection: 'row',
		alignSelf: 'stretch',
		height: 50,
		borderColor: textColor,
		borderWidth: 1,
		borderRadius: 4
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
	btnDisabledText: {
		fontSize: 14,
		fontWeight: 'bold',
		color: pColorLight
	},
	btnText: {
		fontSize: 14,
		fontWeight: 'bold',
		color: pColorDark
	}
})
