import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { handleReceiveDecks } from '../actions'
import { textColorInverse, textColor, pColor, pColorLight, pColorDark, sColor, sColorLight, sColorDark } from '../utils/colors'

class Decks extends Component {

	static propTypes = {
		handleDecks: PropTypes.func.isRequired,
		decksKeys: PropTypes.array.isRequired,
		decks: PropTypes.object.isRequired
	}

	state = {
		loaded: false
	}

	toAddDeck = () => {
		this.props.navigation.dispatch(NavigationActions.navigate({
			routeName: 'AddDeck'
		}))
	}

	toDeck = (deckId) => {
		this.props.navigation.dispatch(NavigationActions.navigate({
			routeName: 'Deck',
			params: { deckId }
		}))
	}

	componentDidMount() {
		const { handleDecks } = this.props
		handleDecks()
			.then(() => (this.setState({loaded: true})))
	}

	render() {
		const { loaded } = this.state
		const { decks, decksKeys } = this.props

		if ( decksKeys.length === 0 && loaded ) {
			return (
				<View style={styles.container}>
					<View style={styles.item}>
						<Text style={styles.textEmpty}>You do not create any deck!</Text>
						<TouchableOpacity
							style={[styles.btn, styles.input]}
							onPress={this.toAddDeck}>
							<Text style={styles.btnText}>{'New Deck'.toUpperCase()}</Text>
						</TouchableOpacity>
					</View>
				</View>
			)
		}

		return (
			<View style={styles.container}>
				<FlatList
					data={decksKeys}
					style={[styles.container, {marginLeft: 4}]}
					showsVerticalScrollIndicator={false}
          renderItem={
          	({item}) => (
		          <TouchableOpacity
		          	style={styles.item}
								onPress={() => this.toDeck(item)}>
		            <Text style={styles.text}>{item}</Text>
		            { decks[item].hasOwnProperty('questions') &&
			            <Text style={styles.detail}>
			            	{decks[item].questions.length} { decks[item].questions.length === 1 && 'card' } { decks[item].questions.length !== 1 && 'cards' }
			            </Text>
			          }
			          { !decks[item].hasOwnProperty('questions') &&
			          	<Text style={styles.detail}>0 cards </Text>
			        	}
		          </TouchableOpacity>
          	)
          }
          removeClippedSubviews={true}
          keyExtractor={item => item} />
			</View>
		)
	}
}

export const mapStateToProps = ({ decks }) => {
return {
		decksKeys: Object.keys(decks),
		decks: decks
	}
}

export const mapDispatchToProps = (dispatch) => {
  return {
    handleDecks: () => dispatch(handleReceiveDecks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks)

/* STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: sColorLight,
    paddingTop: 4,
    paddingBottom: 4
  },
  item: {
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
  	fontSize: 18,
  	textAlign: 'center',
  	color: textColor
  },
  detail: {
  	fontSize: 14,
  	color: sColorDark
  },
  textEmpty: {
  	textAlign: 'center',
  	fontSize: 24,
		marginRight: 10,
		marginLeft: 10,
		color: textColor
  },
  input: {
		flexDirection: 'row',
		alignSelf: 'stretch',
		height: 50,
		borderBottomColor: pColorDark,
		borderBottomWidth: 1,
		borderRadius: 3,
		margin: 10
	},
	btn: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 4,
	},
	btnText: {
		fontSize: 14,
		fontWeight: 'bold',
		color: pColorDark
	}
})
