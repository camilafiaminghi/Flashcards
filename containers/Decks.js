import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { handleReceiveEntries } from '../actions'
import { gray, lightPurp, purple, white, black } from '../utils/colors'

class Decks extends Component {

	static propTypes = {
		handleEntries: PropTypes.func.isRequired,
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

	toDeck = (entryId) => {
		this.props.navigation.dispatch(NavigationActions.navigate({
			routeName: 'Deck',
			params: { entryId }
		}))
	}

	componentDidMount() {
		const { handleEntries } = this.props
		handleEntries()
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
							<Text style={styles.btnText}>{'Create a Deck'.toUpperCase()}</Text>
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
		            <Text style={styles.detail}>
		            	{decks[item].questions.length} { decks[item].questions.length === 1 && 'card' } { decks[item].questions.length !== 1 && 'cards' }
		            </Text>
		          </TouchableOpacity>
          	)
          }
          removeClippedSubviews={true}
          keyExtractor={item => item} />
			</View>
		)
	}
}

export const mapStateToProps = ({ entries }) => {

	return {
		decksKeys: Object.keys(entries),
		decks: entries
	}
}

export const mapDispatchToProps = (dispatch) => {
  return {
    handleEntries: () => dispatch(handleReceiveEntries())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks)

/* STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
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
  	borderRadius: 4,
  	padding: 20
  },
  text: {
  	fontSize: 18,
  	color: black
  },
  detail: {
  	fontSize: 14,
  	color: gray
  },
  textEmpty: {
  	fontSize: 20,
		marginRight: 10,
		marginLeft: 10,
		color: '#333333'
  },
  input: {
		flexDirection: 'row',
		alignSelf: 'stretch',
		height: 50,
		borderColor: purple,
		borderWidth: 1,
		borderRadius: 4,
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
		color: purple
	}
})