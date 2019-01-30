import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { handleAddEntry } from '../actions'
import { isValid } from '../utils/validation'
import { gray, black, purple, white } from '../utils/colors'
import AppTextInput from '../components/AppTextInput'

class AddDeck extends Component {

	static propTypes = {
		onAddEntry: PropTypes.func.isRequired
	}

	state = {
		title: '',
		valid: false
	}

	toDecks = () => {
		this.props.navigation.dispatch(NavigationActions.navigate({
			routeName: 'Decks'
		}))
	}

	submit = () => {
		const { onAddEntry } = this.props
		const { title } = this.state

		onAddEntry({ title })
			.then(this.toDecks) /* Navigate to Decks */
	}

	onInputChange = (name, value, valid) => {
		this.setState((state) => ({
			...state,
			title: value,
			valid
		}))
	}

	render() {
		const { valid } = this.state

		return (
			<View style={styles.container}>
				<KeyboardAvoidingView behavior='padding' style={styles.card}>

					<Text style={styles.text}>What the title of your new deck?</Text>

					<AppTextInput
						name='title'
						placeholder='Deck Title (max 55 characters)'
						maxLen={55}
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

export const mapDispatchToProps = (dispatch) => {
	return {
		onAddEntry: (entry) => dispatch(handleAddEntry(entry))
	}
}

export default connect(null, mapDispatchToProps)(AddDeck)

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
		backgroundColor: purple,
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
