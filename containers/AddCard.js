import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { StyleSheet, KeyboardAvoidingView, Text, View, TouchableOpacity } from 'react-native'
import { handleAddCard } from '../actions'
import { gray, lightPurp, purple, white, orange, black } from '../utils/colors'
import { isValid } from '../utils/validation'
import AppTextInput from '../components/AppTextInput'

class AddCard extends Component {

	static navigationOptions = ({ navigation }) => {
		return {
			title: 'New Card'
		}
	}

	static propTypes = {
		entryId: PropTypes.string.isRequired
	}

	state = {
		card: {
			title: '',
			body: ''
		},
		validation: {
			title: false,
			body: false
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
		const { entryId } = this.props

		this.props.navigation.dispatch(NavigationActions.navigate({
			routeName: 'Deck',
			params: { entryId }
		}))
	}

	submit = () => {
		const { onAddCard, entryId } = this.props
		const { card } = this.state

		onAddCard(entryId, card)
			.then(this.toDeck) /* Navigate to Deck */
	}

	render() {
		const { valid } = this.state

		return (
			<View style={styles.container}>
				<KeyboardAvoidingView behavior='padding' style={styles.card}>

					<AppTextInput
						name='title'
						placeholder='Question? (max 122 characters)'
						maxLen={122}
						onInputChange={this.onInputChange} />

					<AppTextInput
						name='body'
						placeholder='Answer (max 255 characters)'
						maxLen={255}
						onInputChange={this.onInputChange} />

		      <TouchableOpacity
		      	style={valid ? [styles.input, styles.btn] : [styles.input, styles.btn, {opacity: .7}]}
		      	disabled={!valid}
		      	onPress={this.submit}>
		      	<Text style={styles.btnText}>{'submit'.toUpperCase()}</Text>
		      </TouchableOpacity>

				</KeyboardAvoidingView>
			</View>
		)
	}
}

export const mapStateToProps = (state, { navigation }) => {
	const { entryId } = navigation.state.params

	return {
		entryId
	}
}

export const mapDispatchToProps = (dispatch) => {
	return {
		onAddCard: (entryId, card) => dispatch(handleAddCard(entryId, card))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)

/* STYLES */
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'stretch',
		backgroundColor: '#f2f2f2',
	},
	card: {
		flex: 1,
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		margin: 8,
		padding: 8,
		borderRadius: 4
	},
	input: {
		flexDirection: 'row',
		alignSelf: 'stretch',
		height: 50,
		borderColor: purple,
		borderWidth: 1,
		borderRadius: 4
	},
	text: {
		textAlign: 'center',
		fontSize: 20,
		marginRight: 10,
		marginLeft: 10,
		color: '#333333'
	},
	btn: {
		backgroundColor: black,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 4,
		marginRight: 10,
		marginLeft: 10
	},
	btnText: {
		fontSize: 14,
		fontWeight: 'bold',
		color: white
	}
})
