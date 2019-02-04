import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { handleAddDeck } from '../actions'
import { isValid } from '../utils/validation'
import { textColorInverse, textColor, pColor, pColorLight, pColorDark, sColor, sColorLight, sColorDark } from '../utils/colors'
import AppTextInput from '../components/AppTextInput'

class AddDeck extends Component {

	static propTypes = {
		onAddDeck: PropTypes.func.isRequired
	}

	state = {
		title: '',
		valid: false,
		resetValue: false
	}

	toDeck = () => {
		const { title } = this.state

		this.props.navigation.dispatch(NavigationActions.navigate({
			routeName: 'Deck',
			params: { deckId: title }
		}))
	}

	submit = () => {
		const { onAddDeck } = this.props
		const { title } = this.state

		onAddDeck({ title })
			.then(this.setState((state) => ({...state, resetValue: true})))
			.then(this.toDeck) /* Navigate to Decks */
	}

	onInputChange = (name, value, valid) => {
		this.setState((state) => ({
			...state,
			title: value,
			valid
		}))
	}

	componentDidMount() {
    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      () => { this.setState((state) => ({...state, resetValue: false})) },
    )
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

	render() {
		const { valid, resetValue } = this.state

		return (
			<View style={styles.container}>
				<KeyboardAvoidingView behavior='padding' style={styles.card}>

					<Text style={styles.text}>What the title of your new deck?</Text>

					{ (!resetValue) &&
						<AppTextInput
							name='title'
							placeholder='Deck Title (max 55 characters)'
							maxLen={55}
							onInputChange={this.onInputChange}
							resetValue={resetValue} />
					}

				  <TouchableOpacity
		      	style={[styles.input, styles.btn]}
		      	disabled={!valid}
		      	onPress={this.submit}>
		      	<Text style={ valid ? styles.btnText : styles.btnDisabledText }>{'Create Deck'.toUpperCase()}</Text>
		      </TouchableOpacity>

				</KeyboardAvoidingView>
			</View>
		)
	}
}

export const mapDispatchToProps = (dispatch) => {
	return {
		onAddDeck: (deck) => dispatch(handleAddDeck(deck))
	}
}

export default connect(null, mapDispatchToProps)(AddDeck)

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
		marginTop: 4,
  	marginBottom: 4,
  	marginRight: 8,
  	marginLeft: 8,
  	borderRadius: 3,
  	padding: 20
	},
	text: {
		textAlign: 'center',
  	fontSize: 24,
		marginRight: 24,
		marginLeft: 24,
		color: textColor
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
